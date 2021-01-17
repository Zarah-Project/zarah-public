import axios from 'axios';
export const API = process.env.NEXT_PUBLIC_YAP_API;

export const fetcher = (url, params) => {
  return axios.get(url, {params: params}).then(res => res.data);
};
