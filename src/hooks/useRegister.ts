import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "@/services/api-helper";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";

interface LoginCredentials {
  username: string;
  password: string;
}


const useRegister = () => {
  const apiClient = new APIClient<string>("register/");
  const navigate = useNavigate();
  const loginMutation = useMutation<FetchResponse<string>, Error, LoginCredentials, unknown>(
    {
      mutationFn: async (credentials: LoginCredentials) => {
        const data = await apiClient.post(credentials);
        return data;
      },
      gcTime: 0,
      onSuccess: () => {
        toast("You're registered!", {description: "Redirecting you to login..."});
        setTimeout(() => {
        navigate("/login");
        }, 2000);
      },
      onError: () => {
        toast("Registration failed", {description: loginMutation.error?.message});
      },
    }
  );

  return loginMutation;
};

export default useRegister;
