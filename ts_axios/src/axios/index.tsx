import { AxiosInstance } from "./types.tsx";
import Axios from "./Axios.tsx";
import CancelToken,{isCancel} from './cancel.tsx'


function createInstance() {
  let context = new Axios(); // this指针上下文
  // 让request方法里的this永远指向context也就是new Axios()
  let instance = Axios.prototype.request.bind(context);
  //把Axios的类的实例和类的原型上的方法都拷贝到了instance上，也就是request方法上
  instance = Object.assign(instance, Axios.prototype, context);
  return instance as AxiosInstance;
}
const axios = createInstance();
axios.cancelToken = new CancelToken()
axios.isCancel = isCancel;

export default axios;
export * from "./types.tsx";