import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { pb } from "@/config/pocketbaseConfig";
import {
  createFile,
  listFiles,
  smartSubscribeToFiles,
  subscribeToFiles,
  TFile,
} from "@/modules/files/dbFilesUtils";
import { Label } from "@radix-ui/react-label";
import { RecordModel, RecordSubscription } from "pocketbase";
import { useState } from "react";

export const SubscribeToFilesButton = (p: {
  onChange: (e: RecordSubscription<RecordModel>) => void;
}) => {
  return (
    <Button
      onClick={async () => {
        subscribeToFiles({
          pb,
          onCreateFile: (e) => {
            console.log(e);
            p.onChange(e);
          },
          onUpdateFile: () => {},
          // onDeleteFile: () => {}
        });
      }}
    >
      subscribeToFiles
    </Button>
  );
};
export const SmartSubscribeToFilesButton = (p: { onChange: (e: TFile[]) => void }) => {
  return (
    <Button
      onClick={async () => {
        smartSubscribeToFiles({ pb, onChange: p.onChange });
      }}
    >
      smartSubscribeToFiles
    </Button>
  );
};

export const ListFilesButton = () => {
  return (
    <Button
      onClick={async () => {
        const resp = await listFiles({ pb });
        console.log(resp);
      }}
    >
      ListFilesButton
    </Button>
  );
};

export const CreateFileForm = () => {
  const [filePath, setFilePath] = useState("");
  const [file, setFile] = useState<File | null>(null);
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex flex-1 flex-col gap-1">
          <Label htmlFor="file">File Path</Label>
          <Input
            type="text"
            value={filePath}
            onInput={(e) => {
              const str = (e.target as unknown as { value: string }).value;
              setFilePath(str);
            }}
          />
        </div>
        <div className="flex flex-wrap items-end gap-2">
          <div className="flex flex-1 flex-col gap-1">
            <Label htmlFor="file">Choose a file</Label>
            <Input
              id="file"
              type="file"
              placeholder="File"
              accept="image/*"
              onInput={(e) => {
                const tempFiles = (e.target as unknown as { files: File[] })?.files;
                const tempFile = tempFiles?.[0];
                if (tempFile) setFile(tempFile);
              }}
            />
          </div>
          <Button
            className="self-end"
            disabled={!file}
            onClick={async () => {
              if (!file) return;
              await createFile({
                pb,
                data: { file, filePath: `${filePath}/file_${Math.random() * 1000}` },
              });
            }}
          >
            Upload
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
