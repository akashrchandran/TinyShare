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

export function DialogUploader() {
  const [files, setFiles] = React.useState<File[]>([]);
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
          maxSize={5 * 1024 * 1024}
          onValueChange={setFiles}
          accept={{}}
          multiple={true}
        />
      </DialogContent>
    </Dialog>
  )
}