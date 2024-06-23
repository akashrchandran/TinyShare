import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  error: boolean;
  "status-code": number;
  response: T | null;
  messages: string[] | string;
}

const axiosInstance = axios.create({
  baseURL: "https://tinyshare-backend-20da70c49ac9.herokuapp.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

const setAuthorizationHeader = (token: string | null) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    const token = localStorage.getItem("token");
    setAuthorizationHeader(token);
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };

  post = (data: object) => {
    return axiosInstance
      .post<FetchResponse<T>>(this.endpoint, data)
      .then((res) => res.data);
  };

  uploadFile = (
    data: FormData,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
  ) => {
    return axiosInstance
      .post(this.endpoint, data, {
        onUploadProgress,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };
}

export default APIClient;
