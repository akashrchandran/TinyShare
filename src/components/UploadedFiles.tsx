import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { EmptyCard } from "@/components/EmptyCard";
import { UploadedFile } from "@/hooks/use-upload";
import { FileIcon, defaultStyles } from "react-file-icon";

interface UploadedFilesCardProps {
  uploadedFiles: UploadedFile[];
}

export function UploadedFiles({ uploadedFiles }: UploadedFilesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded files</CardTitle>
        <CardDescription>View the uploaded files here</CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4">
            <div className="flex w-max space-x-2.5">
              {uploadedFiles.map((file) => {
                const extension = file.file_type.split(
                  "/"
                )[1] as keyof typeof defaultStyles;
                return (
                  <div key={file.id} className="relative aspect-video w-64">
                    <div
                      className="w-16 h-16 rounded-md object-cover"
                      title={file.name}
                    >
                      <FileIcon
                        extension={extension}
                        {...defaultStyles[extension]}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}
