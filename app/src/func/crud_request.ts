import axios from "axios";

const PREFIX_URL = "http://localhost:8000/";
export const get = async (url: string) => {
  const result = await axios.get(`${PREFIX_URL}${url}`, {
    withCredentials: true,
  });
  return result.data;
};

export const post = async (url: string, data: any) => {
  const result = await axios.post(`${PREFIX_URL}${url}`, data, {
    withCredentials: true,
    timeout: 100000,
  });
  return result.data;
};

export const remove = async (url: string, data: any) => {
  const result = await axios.delete(`${PREFIX_URL}${url}`, {
    data: data,
    withCredentials: true,
  });
  return result.data;
};
