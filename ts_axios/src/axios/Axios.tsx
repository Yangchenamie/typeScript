import qs from "qs";
import { AxiosRequestConfig, AxiosResponse } from "./types.tsx";
import parseHeaders from "parse-headers";
import AxiosInterceptorManager, {
  Interceptor,
} from "./AxiosInterceptorManager.tsx";

let defaults: AxiosRequestConfig = {
  method: "GET",
  timeout: 5000,
  headers: {
    common: {
      //针对所有方法的请求生效
      name: "requestname",
      accept: "application/json", //指定告诉服务器返回JSON格式的数据
    },
  },
  transformRequest: (data: any, headers: any) => {
    headers["common"]["content-type"] = "application/json";
    return JSON.stringify(data);
  },
  transformResponse(response: any) {
    return response.data;
  },
};

let getStyleMethods = ["get", "head", "delete", "options"];
getStyleMethods.forEach((method: string) => {
  defaults.headers![method] = {};
});
let postStyleMethods = ["post", "put", "patch"];
postStyleMethods.forEach((method: string) => {
  defaults.headers![method] = {
    "content-type": "application/json",
  };
});

let allMethods = [...getStyleMethods, ...postStyleMethods];

export default class Axios<T> {
  public defaults: AxiosRequestConfig = defaults;
  public interceptors = {
    request: new AxiosInterceptorManager<AxiosRequestConfig>(),
    response: new AxiosInterceptorManager<AxiosResponse<T>>(),
  };
  // T用来限制响应对象response里的data类型
  request(
    config: AxiosRequestConfig
  ): Promise<AxiosRequestConfig | AxiosResponse<T>> {
    // return this.dispatchRequest(config);

    config.headers = Object.assign(this.defaults.headers, config.headers);

    if (config.transformRequest && config.data) {
      config.data = config.transformRequest(config.data, config.headers);
    }

    const chain: Array<
      Interceptor<AxiosRequestConfig> | Interceptor<AxiosResponse<T>>
    > = [{ onFulfilled: this.dispatchRequest }];

    this.interceptors.request.interceptors.forEach(
      (interceptor: Interceptor<AxiosRequestConfig> | null) => {
        interceptor && chain.unshift(interceptor);
      }
    );
    this.interceptors.response.interceptors.forEach(
      (interceptor: Interceptor<AxiosResponse<T>> | null) => {
        interceptor && chain.push(interceptor);
      }
    );

    let promise: any = Promise.resolve(config);
    while (chain.length) {
      const { onFulfilled, onRejected } = chain.shift()!;
      promise = promise.then(onFulfilled, onRejected);
    }
    return promise;
  }
  //   定义一个派发请求的方法
  dispatchRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      let { url, method, params, timeout, data, headers } = config;
      let request = new XMLHttpRequest();

      if (params && typeof params == "object") {
        params = qs.stringify(params);
        url += (url!.indexOf("?") > -1 ? "&" : "?") + params;
      }

      request.open(method!, url!, true);
      request.responseType = "json";
      request.onreadystatechange = () => {
        // 0 1 2 3 4 表完成
        if (request.readyState === 4 && request.status !== 0) {
          // request.status !== 0 超时就会为0
          if (request.status >= 200 && request.status < 300) {
            let response = {
              data: request.response ? request.response : request.responseText,
              status: request.status,
              statusText: request.statusText,
              headers: parseHeaders(request.getAllResponseHeaders()),
              config,
              request,
            };
            if (config.transformResponse) {
              response = config.transformResponse(response);
            }
            resolve(response);
          } else {
            // 状态码错误
            reject(`Error: Request failed with status code ${request.status}`);
          }
        }
      };

      /* if (headers) {
        for (let key in headers) {
          request.setRequestHeader(key, headers[key]);
        }
      } */
      if (headers) {
        for (let key in headers) {
          //common表示所有的请求方法都生效  或者说key是一个方法名
          /**
           * {
           * headers:{
           *   common:{accept: 'application/json'},
           *   post:{'content-type':'application/json'}
           * }
           * }
           */
          if (key === "common" || allMethods.includes(key)) {
            if (key === "common" || key === config.method) {
              for (let key2 in headers[key]) {
                request.setRequestHeader(key2, headers[key][key2]);
              }
            }
          } else {
            request.setRequestHeader(key, headers[key]);
          }
        }
      }

      let body: string | null = null;
      if (data) {
        body = JSON.stringify(data);
      }
      //   超时错误
      if (timeout) {
        request.timeout = timeout;
        request.ontimeout = () => {
          reject(`Error: timeout of ${timeout}ms exceeded`);
        };
      }

      //   网络错误
      request.onerror = () => {
        reject("net::ERR_INTERNET_DISCONNECTED");
      };


      // 取消请求
      if(config.cancelToken){
        config.cancelToken.then((message:string)=>{
          request.abort();
          reject(message)
        })
      }

      request.send(body);
    });
  }
}
