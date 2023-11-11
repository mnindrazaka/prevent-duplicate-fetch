import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const pending: Record<string, Promise<AxiosResponse<any, any>>> = {};

const httpClient: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

httpClient.interceptors.response.use((value) => {
  if (pending[value.config.url ?? ""] !== undefined) {
    delete pending[value.config.url ?? ""];
  }

  return value;
});

export const httpClientWithCache: AxiosInstance & {
  getWithCache: <T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined
  ) => Promise<R>;
} = {
  ...Object.assign(
    Object.create(Object.getPrototypeOf(httpClient.get)),
    httpClient
  ),
  getWithCache: (url, config) => {
    if (pending[url] === undefined) {
      pending[url] = httpClient.get(url, config);
    }

    return pending[url];
  },
};
