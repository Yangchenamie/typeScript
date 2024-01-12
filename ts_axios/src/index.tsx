import axios, { AxiosResponse } from "./axios/index.tsx";
/* import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"; */
const baseUrl = "http://localhost:8080";
interface User {
  name: string;
  age: number;
}
let user: User = {
  name: "zs",
  age: 18,
};
/* axios.interceptors.request.use(
  (
    config: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> | AxiosRequestConfig => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        config.headers!.name += "1";
        resolve(config);
      }, 1000);
    });
  }
);
let request = axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers!.name += "2";
    return config;
  }
);
axios.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers!.name += "3";
    return config;
  }
);

axios.interceptors.response.use((response: AxiosResponse) => {
  response.data.name += "1";
  return response;
});
let response = axios.interceptors.response.use((response: AxiosResponse) => {
  response.data.name += "2";
  return response;
});
axios.interceptors.response.use((response: AxiosResponse) => {
  response.data.name += "3";
  return response;
});
axios.interceptors.request.eject(request)
axios.interceptors.response.eject(response) */

const cancelToken = axios.cancelToken;
const isCancel = axios.isCancel;
const source = cancelToken.source();

axios({
  url: baseUrl + "/post",
  method: "post",
  headers: {
    // "content-type": "application/json",
  },
  data: user,
  cancelToken: source.token,
  // timeout: 5000,
})
  .then((response: AxiosResponse<User>) => {
    console.log(response);
    console.log(response.data);

    return response.data;
  })
  .catch((error: any) => {
    if (isCancel(error)) {
      console.log("isCancel取消请求", error);
    } else {
      console.log(error);
    }
  });
source.cancel('用户取消请求')
