import axios from 'axios'

export function request(config) {

  const instance = axios.create({
    baseURL:'http://106.54.54.237:8000/',
    timeout:10000,
  })

  instance.interceptors.request.use(config=>{
    return config;
  },err=>{
    return err;
  })

  instance.interceptors.response.use(res =>{
    return res.data;
  },error => {
    return error
  })

  return instance(config)
}
