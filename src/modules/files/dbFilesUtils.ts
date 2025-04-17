import PocketBase, { RecordModel, RecordSubscription } from "pocketbase";
import { z } from "zod";

const fileSchema = z.object({
  id: z.string(),
  // file: z.instanceof(File1),
  filePath: z.string(),
  created: z.string(),
  updated: z.string(),
});
export type TFile = z.infer<typeof fileSchema>;

export const listFiles = async (p: { pb: PocketBase }) => {
  try {
    const initData = await p.pb.collection("files").getFullList({
      sort: "-created",
    });

    const data = initData
      .map((x) => fileSchema.safeParse(x))
      .filter((x) => x.success)
      .map((x) => x.data);
    return { success: true, data } as const;
  } catch (error) {
    return { success: false, error } as const;
  }
};

export const subscribeToFiles = async (p: {
  pb: PocketBase;
  onCreateFile: (e: RecordSubscription<RecordModel>) => void;
  onUpdateFile: (e: RecordSubscription<RecordModel>) => void;
}) => {
  // Subscribe to changes in any record in the collection
  p.pb.collection("files").subscribe("*", (e) => {
    if (e.action) p.onCreateFile(e);
  });
  return { success: true } as const;
};

export const smartSubscribeToFiles = async (p: {
  pb: PocketBase;
  onChange: (x: TFile[]) => void;
}) => {
  const listFilesResp = await listFiles(p);
  if (!listFilesResp.success) return listFilesResp;

  let allFiles = listFilesResp.data;
  p.onChange(allFiles);
  const unsub = p.pb.collection("files").subscribe("*", (e) => {
    if (e.action === "create") {
      const parseResp = fileSchema.safeParse(e.record);
      if (parseResp.success) allFiles.push(parseResp.data);
    }
    if (e.action === "update") {
      const parseResp = fileSchema.safeParse(e.record);
      if (!parseResp.success) return;

      allFiles = allFiles.filter((x) => parseResp.data?.id !== x.id);
      allFiles.push(parseResp.data);
    }
    if (e.action === "delete") {
      const parseResp = fileSchema.safeParse(e.record);
      if (!parseResp.success) return;

      allFiles = allFiles.filter((x) => parseResp.data?.id !== x.id);
    }
    p.onChange(allFiles);
  });

  return { success: true, data: unsub } as const;
};

export const createFile = async (p: { pb: PocketBase; data: { file: File; filePath: string } }) => {
  try {
    const resp = await p.pb.collection("files").create(p.data);
    return { success: true, data: resp } as const;
  } catch (error) {
    return { success: false, error } as const;
  }
};
