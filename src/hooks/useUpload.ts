import APIClient from "@/services/api-helper";
import { useState, useCallback } from "react";

export const useFileUpload = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const apiClient = new APIClient<string>("upload/");

  const upload = useCallback(async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await apiClient.uploadFile(formData, (event) => {
        if (event.total) {
          setProgress(Math.round((100 * event.loaded) / event.total));
        }
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error(String(err)));
      }
    }
  }, []);

  return { upload, progress, error };
};
