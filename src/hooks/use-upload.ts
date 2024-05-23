import * as React from "react";
import { toast } from "sonner";

import { getErrorMessage } from "@/lib/handle-errors";
import APIClient from "@/services/api-helper";

export interface UploadedFile {
  key: string;
  name: string;
  thumb: string;
  url: string;
}

interface UseUploadFileProps {
  defaultUploadedFiles?: UploadedFile[];
}

export function useUploadFile({
  defaultUploadedFiles = []
}: UseUploadFileProps = {}) {
    const apiClient = new APIClient("upload/");
  const [uploadedFiles, setUploadedFiles] =
    React.useState<UploadedFile[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {}
  );
  const [isUploading, setIsUploading] = React.useState(false);

  async function uploadThings(files: File[]) {
    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("file", file);
      });

      const res = await apiClient.uploadFile(formData, (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgresses((prev) => {
            return {
              ...prev,
              [files[0].name]: progress,
            }
          })
        }
      });

      setUploadedFiles((prev) => (prev ? [...prev, ...res.data] : res.data));
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    uploadedFiles,
    progresses,
    uploadFiles: uploadThings,
    isUploading,
  };
}
