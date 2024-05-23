import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  error: boolean;
  "status-code": number;
  response: T | null;
  messages: string[] | string;
}

const axiosInstance = axios.create({
  baseURL: "https://sample-django-7lfj.onrender.com/api/",
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

const token = localStorage.getItem("token");
setAuthorizationHeader(token);

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };

  post = (data: object) => {
    return axiosInstance
      .post<FetchResponse<T>>(this.endpoint, data)
      .then((res) => res.data);
  }

  uploadFile = (data: FormData, onUploadProgress: (progressEvent: AxiosProgressEvent) => void) => {
    return axiosInstance.post(this.endpoint, data, {
      onUploadProgress,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data);
  }
}

export default APIClient;
