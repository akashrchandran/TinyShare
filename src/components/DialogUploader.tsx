import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileUploader } from "@/components/FileUploader"
import { useFileUpload } from "@/hooks/useUpload";
import { toast } from "sonner";

export function DialogUploader() {
  const [files, setFiles] = React.useState<File[]>([]);
  const { upload, progress, error } = useFileUpload();

  const handleUpload = async () => {
    for (const file of files) {
      await upload(file);
    }
  };
  console.log(progress);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Upload files {files.length > 0 && `(${files.length})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>
            Drag and drop your files here or click to browse.
          </DialogDescription>
        </DialogHeader>
        <FileUploader
        onUpload={handleUpload}
          maxSize={5 * 1024 * 1024}
          onValueChange={setFiles}
          accept={{}}
          multiple={true}
          progresses={{ progressKey: progress }}
        />
      </DialogContent>
    </Dialog>
  )
}