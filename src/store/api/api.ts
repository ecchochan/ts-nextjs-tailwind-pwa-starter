/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import Axios_, {
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
  ResponseType,
} from 'axios';

import { paramsToFormData } from '@/utils/url';

const CancelToken = Axios_.CancelToken;
const isCancel = Axios_.isCancel;

type RequestOptions = {
  responseType?: ResponseType | undefined;
  headers?: unknown;
  dataField?: string;
};

const Axios = <R>(
  url: string | AxiosRequestConfig<R>,
  config?: AxiosRequestConfig<R>
) => {
  return (typeof url === 'string' ? Axios_(url, config) : Axios_(url)).catch(
    (error) => {
      if (error.response) {
        // Request made and server responded
        const { data, status, headers } = error.response;
        console.error(error.response);
        // if (Math.floor(status / 100) === 5)
        // TODO: redirect to proper error page
      } else if (error.request) {
        console.error(error);
        // TODO: redirect to proper error page
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
      throw error;
    }
  );
};

export const getAuthHeaders = (
  url: string,
  force = false
): { Authorization?: string } => {
  if (!force && url.startsWith('http')) {
    // The access token should not be sent to the external
    return {};
  }
  const token = localStorage.getItem('accessToken');
  const tokenType = localStorage.getItem('tokenType');

  if (!token) return {};

  return {
    Authorization: `${tokenType} ${token}`,
  };
};

export const request = (
  method: string,
  url: string,
  params: unknown,
  { responseType, headers, dataField }: RequestOptions = {}
) => {
  const cancelSource = CancelToken.source();
  const ret = Axios({
    url,
    method,
    [dataField || 'data']: params,
    responseType,
    headers: headers
      ? {
          ...headers,
          ...getAuthHeaders(url),
        }
      : getAuthHeaders(url),
    cancelToken: cancelSource.token,
  }) as Promise<AxiosResponse<unknown, unknown>> & { cancel: Canceler };
  ret.cancel = cancelSource.cancel;
  return ret;
};

export const get = (
  url: string,
  params: unknown,
  options: RequestOptions = {}
) => {
  return request('get', url, params, {
    ...options,
    dataField: 'params',
  });
};

export const post = (
  url: string,
  data: unknown,
  options: RequestOptions = {}
) => {
  return request('post', url, data, options);
};

export const post_form = (
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any = {},
  options: RequestOptions = {}
) => {
  return request('post', url, paramsToFormData(data), {
    ...options,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(options?.headers ?? {}),
    },
  });
};

export const patch = (
  url: string,
  data: unknown,
  options: RequestOptions = {}
) => {
  return request('patch', url, data, options);
};

export const put = (
  url: string,
  params: unknown,
  options: RequestOptions = {}
) => {
  return request('put', url, params, options);
};
export const _delete = (
  url: string,
  params: unknown,
  options: RequestOptions = {}
) => {
  return request('delete', url, params, options);
};

const api = {
  get,
  post,
  post_form,
  patch,
  put,
  delete: _delete,
  isCancel,
};

export default api;
