import { File, FileArchive, FileAudio, FileCode, FileText, FileVideo, Image } from "lucide-react";

export function FileIcon({ fileName }: { fileName: string }) {
  const extension = fileName.split(".").pop()?.toLowerCase();

  const FileComp = !extension
    ? File
    : (() => {
        if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) return Image;

        if (["txt", "md", "json", "csv"].includes(extension)) return FileText;

        if (["js", "jsx", "ts", "tsx", "html", "css", "py", "java", "cpp", "c"].includes(extension))
          return FileCode;

        if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) return FileArchive;

        if (["mp3", "wav", "ogg", "m4a"].includes(extension)) return FileAudio;

        if (["mp4", "mov", "avi", "webm"].includes(extension)) return FileVideo;

        return File;
      })();

  return <FileComp className="h-16 w-12" />;
}
