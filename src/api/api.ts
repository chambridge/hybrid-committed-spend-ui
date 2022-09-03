import { authInterceptor as insightsAuthInterceptor } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import axios, { AxiosRequestConfig } from 'axios';

export interface PagedMetaData {
  count: number;
}

export interface PagedLinks {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface PagedResponse<D = any, M = any> {
  meta: M;
  links: PagedLinks;
  data: D[];
}

export function initApi({ version }: { version: string }) {
  // axios.defaults.baseURL = `/api/cost-management/${version}/`;
  axios.defaults.baseURL = `https://billing.dev.api.redhat.com/${version}/`;
  axios.interceptors.request.use(authInterceptor);
  axios.interceptors.request.use(insightsAuthInterceptor);
}

export function authInterceptor(reqConfig: AxiosRequestConfig): AxiosRequestConfig {
  const insights = (window as any).insights;
  return insights.chrome.auth.getToken().then(token => {
    if (!token) {
      return reqConfig;
    }
    return {
      ...reqConfig,
      headers: {
        ...reqConfig.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });
}