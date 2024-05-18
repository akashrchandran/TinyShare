import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "@/services/api-helper";
import { LoginResponse } from "@/models/LoginResponse";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux';
import { loginSuccess } from "@/redux/store";

interface LoginCredentials {
  username: string;
  password: string;
}


const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiClient = new APIClient<LoginResponse>("login/");
  const loginMutation = useMutation<FetchResponse<LoginResponse>, Error, LoginCredentials, unknown>(
    {
      mutationFn: async (credentials: LoginCredentials) => {
        const data = await apiClient.post(credentials);
        return data;
      },
      gcTime: 0,
      onSuccess: (data) => {
        if ( data?.response?.access)
          localStorage.setItem('token', data?.response?.access);
        toast({
          variant: "success",
          title: "You're logged in!",
          description: "Redirecting you to your dashboard...",
        });
        dispatch(loginSuccess());
        setTimeout(() => {
        navigate("/dashboard");
        }, 2000);
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: loginMutation.error?.message,
        });
      },
    }
  );

  return loginMutation;
};

export default useLogin;
