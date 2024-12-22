import axios, { type AxiosRequestConfig } from 'axios';
import { merge } from 'lodash-es';
import { err, ok, Result } from 'neverthrow';

import { HttpException } from './httpException';

export class HttpService {
    protected token = '';
    protected urlBase = '/';

    public constructor(path?: string, token?: string) {
        this.token = token ?? '';
        this.urlBase = path ?? '/';
    }

    protected getConfig(): AxiosRequestConfig {
        return {
            headers: {
                Authorization: this.token ? `Bearer ${this.token}` : 'false'
            },
        };
    }

    protected async get<T>(path = '', configOverrides: AxiosRequestConfig | undefined = undefined,): Promise<Result<T, HttpException>> {
        return await this.requestResultWrapper<T>(path, configOverrides, (fullPath, config) => {
            return axios.get(fullPath, config);
        });
    }

    protected async post<T>(path = '', data: unknown = undefined, configOverrides: AxiosRequestConfig | undefined = undefined,): Promise<Result<T, HttpException>> {
        return await this.requestResultWrapper<T>(path, configOverrides, (fullPath, config) => {
            return axios.post(fullPath, data, config);
        });
    }

    protected async put<T>(path = '', data: unknown = undefined, configOverrides: AxiosRequestConfig | undefined = undefined,): Promise<Result<T, HttpException>> {
        return await this.requestResultWrapper<T>(path, configOverrides, (fullPath, config) => {
            return axios.put(fullPath, data, config);
        });
    }

    protected async patch<T>(path = '', data: unknown = undefined, configOverrides: AxiosRequestConfig | undefined = undefined,): Promise<Result<T, HttpException>> {
        return await this.requestResultWrapper<T>(path, configOverrides, (fullPath, config) => {
            return axios.patch(fullPath, data, config);
        });
    }

    protected async delete<T>(path = '', configOverrides: AxiosRequestConfig | undefined = undefined,): Promise<Result<T, HttpException>> {
        return await this.requestResultWrapper<T>(path, configOverrides, (fullPath, config) => {
            return axios.delete(fullPath, config);
        });
    }

    private async requestResultWrapper<T>(subPath: string, configOverrides: AxiosRequestConfig | undefined, request: (fullPath: string, config: AxiosRequestConfig | undefined) => Promise<{ data: unknown } | null>,): Promise<Result<T, HttpException>> {
        if (subPath.length > 0 && subPath[0] !== '/') subPath = `/${subPath}`;
        const config = merge(this.getConfig() || {}, configOverrides || {});
        try {
            const responseData: T = (await request(`${this.urlBase}${subPath}`, config))?.data as T;
            return ok(responseData);
        } catch (e) {
            const except = err(new HttpException(e));

            if (except.error.responseStatus == 401) {
                localStorage.clear();
                window.location.reload();
            }
            return except;
        }
    }
}
