/// <reference types="sentimental-react-scripts" />

declare interface IResponse<D = AnyObject> {
  /** 响应数据 */
  readonly data: D;

  /** 响应状态码 */
  readonly statusCode: number;

  /** 提示信息  */
  readonly message: string;
}

declare type IResponseError = Omit<IResponse, 'data'>;
