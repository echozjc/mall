import axios from 'axios'

export function request(config) {
    //创建axios实例
    const instance = axios.create({
      baseURL:'http://123.207.32.32:8000',
      timeout:10000,
    })

    //axios的拦截器
    //请求拦截的作用
    instance.interceptors.request.use(config=>{
      // console.log(config);
      //1.一些config不符合服务器的要求，可以通过拦截
      //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标，请求成功后就消失掉
      //3.某些网站请求(比如登录(token))，必须携带一些特殊的信息
      return config;
    },err=>{
      // console.log(err);
    });
    //响应拦截
    instance.interceptors.response.use(res=>{
      // console.log(res);
      //返回数据即可
      return res.data;
    },err=>{
      console.log(err);
    });
    //返回的本身就是promise
    return instance(config)
}
