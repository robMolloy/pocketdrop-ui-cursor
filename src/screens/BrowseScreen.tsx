import { CreateDirectoryForm } from "@/components/CreateDirectoryForm";
import { FileDetails } from "@/components/FileDetails";
import { FileIcon } from "@/components/FileIcon";
import { ModalContent } from "@/components/Modal";
import { RightSidebarContent } from "@/components/RightSidebar";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/modules/files/FileUploader";
import { useFilesStore } from "@/modules/files/filesStore";
import { useModalStore } from "@/stores/modalStore";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { Folder, Plus } from "lucide-react";
import { useRouter } from "next/router";

export const BrowseScreen = (p: { browsePath: string }) => {
  const router = useRouter();
  const rightSidebarStore = useRightSidebarStore();
  const filesStore = useFilesStore();
  const modalStore = useModalStore();

  // Get all unique directories in the current path
  const directories = new Set<string>();
  const files = filesStore.data;

  files?.forEach((file) => {
    const filePath = file.filePath;
    if (filePath.startsWith(p.browsePath + "/")) {
      const remainingPath = filePath.slice(p.browsePath.length + 1);
      const nextSlashIndex = remainingPath.indexOf("/");
      if (nextSlashIndex > 0) {
        directories.add(remainingPath.slice(0, nextSlashIndex));
      }
    }
  });

  // Filter files for current path
  const currentPathFiles = !files
    ? []
    : files
        .filter((file) => {
          const fileDir = file.filePath.substring(0, file.filePath.lastIndexOf("/"));
          return fileDir === p.browsePath;
        })
        .filter((file) => file.file !== "");

  return (
    <>
      <div className="flex items-end justify-between">
        <div className="flex items-end gap-2">
          <h1 className="mb-0 text-2xl font-bold">Current Path:</h1>
          <span className="flex-1 text-lg">{p.browsePath}</span>
        </div>
        <div className="flex items-end gap-2">
          <Button
            variant="outline"
            onClick={() =>
              modalStore.setData(
                <ModalContent
                  title="New directory"
                  description={`Create a new directory at ${p.browsePath}`}
                  content={
                    <CreateDirectoryForm onSuccess={modalStore.close} currentPath={p.browsePath} />
                  }
                />,
              )
            }
          >
            <Plus /> New Directory
          </Button>
        </div>
      </div>

      <br />

      <div>
        <FileUploader currentPath={p.browsePath} onUploadComplete={() => {}} />
      </div>

      <br />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {/* Show directories first */}
        {Array.from(directories).map((dirName) => (
          <div
            key={dirName}
            onClick={() => {
              router.push(`/browse${p.browsePath}/${dirName}`);
            }}
            className="flex cursor-pointer flex-col items-center rounded-lg border p-4 hover:bg-accent"
          >
            <Folder className="mb-2 h-12 w-12" />
            <span className="break-all text-center text-sm">{dirName}</span>
          </div>
        ))}

        {/* Then show files */}
        {currentPathFiles.map((file) => {
          const fileName = file.filePath.split("/").pop() || "";

          return (
            <div
              key={file.id}
              onClick={async () => {
                rightSidebarStore.setData(
                  <RightSidebarContent title="File Details">
                    <FileDetails
                      file={file}
                      onDelete={() => {
                        rightSidebarStore.close();
                      }}
                    />
                  </RightSidebarContent>,
                );
              }}
              className="flex cursor-pointer flex-col items-center rounded-lg border p-4 hover:bg-accent"
            >
              <FileIcon fileName={fileName} />
              <span className="break-all text-center text-sm">{fileName}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
