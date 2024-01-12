interface onFulfilled<V> {
  (value: V): V | PromiseLike<V> | undefined | null;
}  // //V | PromiseLike<V>) | undefined | null

interface onRejected {
  (error: any): any;
}

export interface Interceptor<V> {
  onFulfilled?: onFulfilled<V>;
  onRejected?: onRejected;
}

// V 可能是AxiosRequestConfig 也可能是 AxiosResponse
export default class AxiosInterceptorManager<V> {
  public interceptors: Array<Interceptor<V> | null> = [];
  use(onFulfilled?: onFulfilled<V>, onRejected?: onRejected): number {
    this.interceptors.push({ onFulfilled, onRejected });
    return this.interceptors.length - 1;
  }
  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}
