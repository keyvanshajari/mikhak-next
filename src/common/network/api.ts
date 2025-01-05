import axios from "axios";
import { ObjectStringAny, ObjectStringString } from "../../types/types";
import { IClientResponse } from "../../types/response-type";
import { signOut } from "next-auth/react";
import { BASE_URL_DEV, BASE_URL_PROD, isDev } from "../config/config";

export interface requestOptions {
  method: "post" | "get" | "put" | "patch" | "delete";
  endpoint: string;
  params?: ObjectStringAny;
  query?: ObjectStringAny;
  body?: ObjectStringAny;
  headers?: ObjectStringString;
  validateStatus?: boolean;
}

axios.defaults.baseURL = isDev ? BASE_URL_DEV : BASE_URL_PROD;
console.log("isDev==>", isDev);

class API<T> {
  async makeRequest(options: requestOptions): Promise<IClientResponse<T>> {
    const url = options.query
      ? `${options.endpoint}?${new URLSearchParams(Object.entries(options.query)).toString()}`
      : options.endpoint;

    try {
      const config: ObjectStringAny = {
        url: `api${url}`,
        method: options.method,
      };

      if (options.params) config.params = options.params;
      if (options.body) config.data = options.body;
      if (options.validateStatus === false) config.validateStatus = false;

      // Add authorization header if there is access token in the cookies
      if (options.headers) config.headers = { ...config.headers, ...options.headers };

      const response = await axios.request(config);

      return { data: response.data.data, message: response.data.message, status: response.status };
    } catch (error: any) {
      if (error?.response?.status === 401) {
        try {
          signOut();
        } catch (error) {
          console.log("error 401", error);
        }
      }
      const e: IClientResponse<T> = {
        data: error?.response?.data?.data,
        message: error?.response?.data?.message,
        status: error?.response?.status,
      };
      throw e;
    }
  }

  async get(
    endpoint: string,
    query?: ObjectStringAny,
    headers?: ObjectStringString,
    validateStatus = true
  ): Promise<IClientResponse<T>> {
    return this.makeRequest({
      method: "get",
      endpoint,
      headers,
      query,
      validateStatus,
    });
  }

  async post(
    endpoint: string,
    body: ObjectStringAny,
    params?: ObjectStringAny,
    headers: ObjectStringString = {
      "Content-Type": "multipart/form-data",
    }
  ): Promise<IClientResponse<T>> {
    return this.makeRequest({
      method: "post",
      endpoint,
      params,
      headers,
      body,
    });
  }

  async put(
    endpoint: string,
    body: ObjectStringAny,
    params?: ObjectStringAny,
    headers: ObjectStringString = {
      "Content-Type": "multipart/form-data",
    }
  ): Promise<IClientResponse<T>> {
    return this.makeRequest({
      method: "put",
      endpoint,
      params,
      headers,
      body,
    });
  }

  async patch(
    endpoint: string,
    body: ObjectStringAny,
    params: ObjectStringAny = {},
    headers: ObjectStringString = {}
  ): Promise<IClientResponse<T>> {
    return this.makeRequest({
      method: "patch",
      endpoint,
      params,
      headers,
      body,
    });
  }

  async delete(
    endpoint: string,
    body: ObjectStringAny = {},
    params: ObjectStringAny = {},
    headers: ObjectStringString = {}
  ): Promise<IClientResponse<T>> {
    return this.makeRequest({
      method: "delete",
      endpoint,
      params,
      headers,
      body,
    });
  }
}

export default new API();
