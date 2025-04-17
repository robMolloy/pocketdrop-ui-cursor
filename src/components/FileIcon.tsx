import {
  File,
  FileArchive,
  FileAudio,
  FileCode,
  FileText,
  FileVideo,
  Image,
  FileSpreadsheet,
  Presentation,
} from "lucide-react";

export function FileIcon({ fileName }: { fileName: string }) {
  const extension = fileName.split(".").pop()?.toLowerCase();

  const FileComp = !extension
    ? File
    : (() => {
        if (["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "tiff", "ico"].includes(extension))
          return Image;

        if (
          ["txt", "md", "json", "csv", "rtf", "log", "doc", "docx", "pdf", "odt", "pages"].includes(
            extension,
          )
        )
          return FileText;

        if (
          [
            "js",
            "jsx",
            "ts",
            "tsx",
            "html",
            "css",
            "py",
            "java",
            "cpp",
            "c",
            "h",
            "hpp",
            "php",
            "rb",
            "swift",
            "kt",
            "go",
            "rs",
            "sql",
            "sh",
            "bash",
            "yml",
            "yaml",
            "xml",
          ].includes(extension)
        )
          return FileCode;

        if (["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "iso", "dmg"].includes(extension))
          return FileArchive;

        if (["mp3", "wav", "ogg", "m4a", "flac", "aac", "wma", "mid", "midi"].includes(extension))
          return FileAudio;

        if (
          ["mp4", "mov", "avi", "webm", "mkv", "flv", "wmv", "m4v", "mpeg", "mpg", "3gp"].includes(
            extension,
          )
        )
          return FileVideo;

        if (["xls", "xlsx", "ods", "numbers"].includes(extension)) return FileSpreadsheet;

        if (["ppt", "pptx", "odp", "key"].includes(extension)) return Presentation;

        return File;
      })();

  return <FileComp className="h-16 w-12" />;
}
