import { TFileRecord } from "@/modules/files/dbFilesUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, Calendar, Hash, Folder } from "lucide-react";

interface FileDetailsProps {
    file: TFileRecord;
}

export function FileDetails({ file }: FileDetailsProps) {
    // Extract filename from filePath
    const fileName = file.filePath.split("/").pop() || "";

    // Extract directory path
    const directoryPath = file.filePath.substring(0, file.filePath.lastIndexOf("/"));

    // Format dates
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <File className="h-5 w-5" />
                        {fileName}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                            <Folder className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Path:</span>
                            <span className="font-mono">{directoryPath || "/"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Hash className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">ID:</span>
                            <span className="font-mono">{file.id}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Created:</span>
                            <span>{formatDate(file.created)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Updated:</span>
                            <span>{formatDate(file.updated)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="raw">Raw Data</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-sm font-medium">Collection ID</div>
                                    <div className="text-sm text-muted-foreground">{file.collectionId}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-sm font-medium">Collection Name</div>
                                    <div className="text-sm text-muted-foreground">{file.collectionName}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-sm font-medium">File</div>
                                    <div className="text-sm text-muted-foreground">{file.file}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="raw" className="mt-4">
                    <Card>
                        <CardContent className="pt-6">
                            <pre className="overflow-auto rounded-md bg-muted p-4 text-sm">
                                {JSON.stringify(file, null, 2)}
                            </pre>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
} 