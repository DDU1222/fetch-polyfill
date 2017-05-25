const typeMap = {
  'application/json': 'json',
  'text/html': 'text',
  'Blob/File': 'blob',
  'FormData': 'formData',
  'ArrayBuffer': 'arrayBuffer'
}

function handleResponse(response) {
  let contentType = response.headers.get('content-type');
  let responseType = 'text';
  for (let key in typeMap) {
    if (contentType.includes(key)) {
      responseType = typeMap[key];
    }
  }
  console.log('response', response)
  return response[responseType]()
    .then(data => {
      if (response.ok) {
        return data;
      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          errorBody: data
        })
      }
    })
}

export default function Fetch(url, options) {

    if (url && typeof url !== 'string') return;

    if (options && typeof options !== 'object') return;

    const methods = ['GET','PUT','PATCH','DELETE','POST'];
    if (options && options.method && !methods.some(m => m == options.method.toUpperCase())) {
       return false;
    }
    if (options && options.method.toUpperCase() == 'POST' && options.data) {
      if(options.data instanceof FormData){
        options.headers['Content-Type'] = 'multipart/form-data;';
      } else if (options.data instanceof Object) {
        options.body = JSON.stringify(options.data);
      } else {
        options.headers['Content-Type'] = 'application:/x-www-form-urlencoded:charset=UTF-8';
      }
      delete options.data;
    } else if (options && options.data) {
      url += '?' + Object.keys(options.data).map((key) => {
        return `${key}=${encodeURIComponent(options.data[key])}`;
      }).join('&');
      delete options.data;
    }
    return new Promise((resolve, reject) => {
      let myRequest = Object.assign({
        method: 'GET',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        cache: 'default'
      }, options),
      fetch_promise = fetch(url, myRequest)
      .then(handleResponse)
      .then((data) => {
        if (data.status == 0) {
          resolve(data);
        } else {
          reject(data);
        }
      }),
      abort_function = () => {
        reject('abort');
        console.log('abort done');
      },
      timer = null,
      timeout_function = (time) => {
        if (time = +time) {
          timer = setTimeout(abort_function, time);
          console.log('start timeout');
        }
      },
      sequence = [fetch_promise];
      console.log('myRequest', myRequest);
      if (options && options.timeout) {
        let timeout_promise = new Promise((resolve, reject) => {
          timeout_function(options.timeout);
        });
        sequence.push(timeout_promise);
      }
      Promise.race(sequence).then(() => {
        window.clearTimeout(timer);
      }).catch((err) => {
        reject(err);
      });
    });
};