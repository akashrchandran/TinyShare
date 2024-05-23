import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "@/services/api-helper";
import { LoginResponse } from "@/models/LoginResponse";
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
        dispatch(loginSuccess());
        if ( data?.response?.access)
          localStorage.setItem('token', data?.response?.access);
        navigate("/dashboard");
      },
      onError: (error) => {
        return error?.message;
      },
    }
  );

  return loginMutation;
};

export default useLogin;
