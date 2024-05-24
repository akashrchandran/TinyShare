import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUploader } from "@/components/FileUploader";
import { useUploadFile } from "@/hooks/use-upload";
import { UploadedFiles } from "./UploadedFiles";

export function DialogUploader() {
  const { uploadFiles, progresses, uploadedFiles, isUploading } = useUploadFile(
    { defaultUploadedFiles: [] }
  );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-1" size="sm">
          Upload Files
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-full max-h-screen">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Drag and drop your files here or click to browse.
          </DialogDescription>
        </DialogHeader>
        <FileUploader
          multiple={true}
          maxFiles={Infinity}
          maxSize={5 * 1024 * 1024}
          progresses={progresses}
          onUpload={uploadFiles}
          disabled={isUploading}
        />
        <UploadedFiles uploadedFiles={uploadedFiles} />
      </DialogContent>
    </Dialog>
  );
}
