import axios from 'axios';

const baseUrl = 'https://jsonplaceholder.typicode.com/posts/1';
const instance = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export async function fetchUrl() {
    //发送异步请求
    //awit async 等待异步请求完成,同步等待，
    //对应接受的也应该是 async ，await
  await axios.get('https://jsonplaceholder.typicode.com/posts/1').then((response) => {
    return response.data;
}.catch((error) => {
    console.log(error);
  });
}

export function fetchUrl1() {
    axios.instance.get('/posts/1').then((response) => {.
        return response.data;
    }.catch((error) => {
        console.log(error);
    });
}


//简化，减少重复代码
axios.instance.get('/user?ID=12345')

export function fetchUrl2(condition) {
    axios.get('https://jsonplaceholder.typicode.com/posts/2',{params:...condition}).then((response) => {
        return response.data;
    }.catch((error) => {
        console.log(error);
    });
    }