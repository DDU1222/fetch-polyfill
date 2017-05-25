###文件位置
```
/src/js/lib/fetch.js
```

###使用方法

get 请求
```
 Fetch('/status')
 .then(res => {
   console.log('res', res);
 })
 .catch(err => {
   console.log('err', err);
 })
```
post 请求
```
 Fetch('/submit', {
   method: 'POST',
   data: {
     name: 'chenxue'
   }
 })
 .then(res => {
   console.log('res', res);
 })
 .catch(err => {
   console.log('err', err);
 })
```
设置超时时间
```
Fetch('/submit', {
  method: 'POST',
  timeout: 500,
  data: {
    name: 'chenxue'
  }
})
.then(res => {
  console.log('res', res);
})
.catch(err => {
  console.log('err', err);
})
```




