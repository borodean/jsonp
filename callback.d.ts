export interface Callback {
  (err: Error | null, data: any): any;
}

export interface Options {
  parameter?: string;
  object?: object;
  key?: string;
}

export default function jsonp(url: string, options: Options, callback: Callback): void;
export default function jsonp(url: string, callback: Callback): void;
