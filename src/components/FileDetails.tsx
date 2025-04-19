import { FileIcon } from "@/components/FileIcon";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TFileRecord, deleteFile, downloadFile, getFile } from "@/modules/files/dbFilesUtils";
import { Calendar, FileText, Folder, Hash, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { pb } from "@/config/pocketbaseConfig";

export function FileDetails(p: { file: TFileRecord; onDelete: () => void }) {
  const fileName = p.file.filePath.split("/").pop() || "";
  const directoryPath = p.file.filePath.substring(0, p.file.filePath.lastIndexOf("/"));

  const handleDelete = async () => {
    const result = await deleteFile({ pb, id: p.file.id });
    if (result.success) {
      p.onDelete();
    } else {
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const DetailsLine = (p: { Icon: typeof Hash; label: string; value: string }) => {
    return (
      <div className="flex items-center gap-2 text-sm">
        <p.Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">{p.label}:</span>
        <span className="font-mono">{p.value}</span>
      </div>
    );
  };

  return (
    <>
      <Card>
        <CardHeader className="p-4">
          <CardTitle className="flex flex-col items-center gap-4 text-xl">
            <FileIcon fileName={fileName} size={120} />
            <div className="flex text-center text-xl">{fileName}</div>

            <div className="mt-2 flex gap-2">
              <Button
                className="flex-1"
                onClick={async () => {
                  const resp = await getFile({ pb, id: p.file.id });
                  if (resp.success) downloadFile({ data: resp.data });
                }}
              >
                Download
              </Button>
              <Button variant="destructive" className="flex flex-1 gap-2" onClick={handleDelete}>
                <Trash2 size={40} />
                Delete
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <br />
      <div className="mb-2 flex items-center gap-2 text-xl">Information</div>

      <div className="flex flex-col gap-2">
        <DetailsLine Icon={Hash} label="ID" value={p.file.id} />
        <DetailsLine Icon={Folder} label="Path" value={directoryPath} />
        <DetailsLine Icon={Calendar} label="Created" value={formatDate(p.file.created)} />
        <DetailsLine Icon={Calendar} label="Updated" value={formatDate(p.file.updated)} />
        <DetailsLine Icon={Hash} label="Collection ID" value={p.file.collectionId} />
        <DetailsLine Icon={Folder} label="Collection Name" value={p.file.collectionName} />
        <DetailsLine Icon={FileText} label="File" value={p.file.file} />
      </div>
    </>
  );
}
