import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import axios, { AxiosInstance, AxiosRequestConfig, Canceler } from 'axios';
import { HttpMethods, HttpStatus } from '@/constants/enums/service';

export default class HttpServiceRequest {
  private readonly instance: AxiosInstance;

  /** 取消请求控制器集合 */
  private readonly cancelers: Canceler[] = [];

  constructor(config?: AxiosRequestConfig<any>) {
    this.instance = axios.create(config);
    this.createInterceptors();
  }

  /**
   * @description 创建拦截器
   */
  private createInterceptors(): void {
    /// 请求拦截器
    this.instance.interceptors.request.use(
      config => {
        // 收集取消请求控制器
        config.cancelToken = new axios.CancelToken(cancel => {
          this.cancelers.push(cancel);
        });

        return config;
      },
      error => Promise.reject(error),
    );

    /// 响应拦截器
    this.instance.interceptors.response.use(
      response => {
        if (!response.data) {
          const _reason = statusCodeMessage[response.status] || 'The request failed';
          return _reason;
        }
        return response.data;
      },
      error => {
        console.warn(`Request fail reason: ${error?.message || ''}`);
        return null;
      },
    );
  }

  /**
   * @description 当前默认配置
   */
  public get defaults() {
    return this.instance.defaults;
  }

  /**
   * @description 取消当前尚未完成的所有请求
   */
  public cancelAll(): void {
    if (this.cancelers.length === 0) return;

    this.cancelers.forEach(cancel => cancel('Cancel all requests'));
    this.cancelers.length = 0;
  }

  /**
   * @description 取消最近的一次请求
   * @param message 取消请求的描述
   */
  public cancel(message: string = 'Cancel last requests'): void {
    if (this.cancelers.length === 0) return;

    const lastCanceler = this.cancelers.pop();
    lastCanceler && lastCanceler(message);
  }

  public readonly get = this.getHttpRequestBody(HttpMethods.GET);

  public readonly delete = this.getHttpRequestBody(HttpMethods.DELETE);

  public readonly post = this.getHttpRequestBody(HttpMethods.POST);

  public readonly head = this.getHttpRequestBody(HttpMethods.HEAD);

  public readonly patch = this.getHttpRequestBody(HttpMethods.PATCH);

  public readonly put = this.getHttpRequestBody(HttpMethods.PUT);

  private getHttpRequestBody(method: HttpMethods) {
    return <R = any>(url: string, data?: AnyObject) => {
      // progress start
      NProgress.start();

      if (method === HttpMethods.GET) data = { params: data };

      if (method === HttpMethods.DELETE) data = { data };

      return new Promise<IResponse<R>>((resolve, reject) => {
        this.instance[method]<any, IResponse<R> | null>(url, data)
          .then(response => {
            if (response) {
              if (response.statusCode === HttpStatus.OK) resolve(response);
              else reject(response);
            }
          })
          .finally(() => {
            // progress end
            NProgress.done();
          });
      });
    };
  }
}

const statusCodeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误,服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权,但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录,服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除,且不会再得到的。',
  422: '当创建一个对象时,发生一个验证错误。',
  500: '服务器发生错误,请检查服务器。',
  502: '服务器重连中,请稍后再试。',
  503: '服务不可用,服务器暂时过载或维护。',
  504: '网关超时。',
} as const;
