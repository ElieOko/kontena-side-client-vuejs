import axios, { type AxiosInstance } from "axios";

const serverUrl = "127.0.0.1"
const port = 5000
const aliasPath = "/api/v1";
export const useAxiosRequest = (token:string = "") : AxiosInstance  =>{
    const useAxios: AxiosInstance = axios.create({
        baseURL               : `http://${serverUrl}:${port}${aliasPath}`,
        headers   : {
          accept: 'application/json',
          "Content-type"      :   "application/json",
          "X-Requested-With"  :   "XMLHttpRequest",
          //  "Authorization"     :   `x-auth-token ${token}`
        },
      })
      return useAxios
}