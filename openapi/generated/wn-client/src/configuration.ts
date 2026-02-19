import { HttpHeaders } from '@angular/common/http';

export interface ConfigurationParameters {
  basePath?: string;
  defaultHeaders?: { [key: string]: string };
  withCredentials?: boolean;
}

export class Configuration {
  basePath: string;
  defaultHeaders: { [key: string]: string };
  withCredentials: boolean;

  constructor(params: ConfigurationParameters = {}) {
    this.basePath = params.basePath ?? '/api/v1';
    this.defaultHeaders = params.defaultHeaders ?? {};
    this.withCredentials = params.withCredentials ?? false;
  }

  buildHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    Object.entries(this.defaultHeaders).forEach(([k, v]) => {
      headers = headers.set(k, v);
    });
    return headers;
  }
}
