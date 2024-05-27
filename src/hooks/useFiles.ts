import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-helper";
import { UploadedFile } from "./use-upload";

const apiClient = new APIClient<FetchResponse<UploadedFile[]>>('files/');

const useFiles = () => useQuery({
  queryKey: ['files'],
  queryFn: () => apiClient.get(),
  staleTime: 1000 * 60 * 5,
});


export default useFiles;