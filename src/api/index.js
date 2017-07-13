import {message} from 'antd';
import {addHttpLoadLength, delHttpLoadLength} from '../actions/load';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {store} from '../store';

let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for(let p in pending){
        if(pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
            pending[p].f(); //执行取消操作
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
}

var normalAxios = axios.create({
    baseURL: process.env.NODE_ENV == 'development' ? '/api' : 'http://base-wx-api.dns.guazi.com/api',
    withCredentials: true,
    timeout: 4000
});

///////统一处理所有http请求和响应, 在请求发出与返回时进行拦截, 在这里可以做loading页面的展示与隐藏, token失效是否跳转到登录页等事情;
message.config({
    top: 20,
    duration: 2
});
normalAxios.interceptors.request.use(config => {
    // Do something before request is sent
    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c)=>{
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: config.url + '&' + config.method, f: c });
    });
    store && store.dispatch(addHttpLoadLength());
    return config;
}, error => {
    // Do something with request error
    store && store.dispatch(delHttpLoadLength());
    return Promise.reject(error);
});

normalAxios.interceptors.response.use(response => {
    // Do something with response data
    removePending(response.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    store && store.dispatch(delHttpLoadLength());
    if(response.data && response.data.code && response.data.code != 0) {
        message.error(response.data.message || response.data.data || '操作失败!');
    }else if(response.data && response.data.code == 0) {
        if(response.config && response.config.params && response.config.params.showMsg) {
            message.success(response.data.message || '操作成功!')
        }
    }
    return response.data;
}, error => {
    // Do something with response error
    store && store.dispatch(delHttpLoadLength());
    if(error && error.response && error.response.status == '401') {
        var ssoURL = (error && error.response && error.response.data && error.response.data.data) || '';
        location.href = ssoURL + encodeURIComponent(location.href);
    }else if(error && error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
    }else if(error && error.message) {
        message.error(error.message);
    }
    return Promise.reject(error.response && error.response.data);
});

// mock 数据
var mock = new MockAdapter(mockAxios);

mock.onPost('/login').reply(config => {
    let postData = JSON.parse(config.data).data;
    if (postData.user === 'admin' && postData.password === '123456') {
        return [200, require('./mock/user')];
    } else {
        return [500, {message: "Incorrect user or password"}];
    }
    // return new Promise(function(resolve, reject) {
    //     normalAxios.post('http://local.guazi.com/api/authenticate', {
    //         username: postData.user,
    //         password: postData.password,
    //         ...config.params
    //     }).then((res) => {
    //         debugger;
    //         resolve([200, res.data ]);
    //     }).catch((err) => {
    //         debugger;
    //         resolve([500, err ]);
    //     });
    // });
});

mock.onGet('/logout').reply(200, {});
mock.onGet('/my').reply(200, require('./mock/user'));
mock.onGet('/menu').reply(200, require('./mock/menu'));
mock.onGet('/randomuser').reply((config) => {
    return new Promise(function (resolve, reject) {
        normalAxios.get('https://randomuser.me/api', {
            params: {
                results: 10,
                ...config.params
            },
            responseType: 'json'
        }).then((res) => {
            resolve([200, res.data]);
        }).catch((err) => {
            resolve([500, err]);
        });
    });
});
mock.onGet('/form').reply((config) => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve([200, {
                code: 0,
                data: {
                    nickname: 'dhl',
                    phone: '18518281201'
                }
            }])
        }, 1000);
    })
});
mock.onGet('has_access').reply(config => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve([200, {
                code: 0
            }])
        }, 1000);
    })
});

module.exports = mockAxios;
