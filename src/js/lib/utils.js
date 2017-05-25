//解析Url中参数
export function getUrlKey(name) {
  let myUrl = window.location.href;
  let getUrlKey = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  let requestKey = myUrl.substr(myUrl.indexOf("?") + 1).match(getUrlKey);
  if (requestKey != null) return decodeURIComponent(requestKey[2]);
  return null;
}

//获取环境变量
export function getPlatformType() {
  const host = window.location.host;
  const matchArray = host.match(/^(qa|yz)/i);
  let platformType;
  if (matchArray && matchArray.length > 0) {
    platformType = matchArray[0].toLowerCase();
  }
  return platformType ? platformType : '';
}

export function addFavicon(faviconUrl) {
  let faviconLink = document.createElement('link');
  faviconLink.rel = 'shortcut icon';
  faviconLink.id = 'icon-one';
  faviconLink.type = 'image/x-icon';
  faviconLink.href = faviconUrl;
  document.getElementsByTagName('head')[0].appendChild(faviconLink);
}

export function isIE(ver) {
    let b = document.createElement('b');
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->';
    return b.getElementsByTagName('i').length === 1;
}


// 判断是否为空
export function isNotNullOrEmpty (v) {
    let flag = false;
    switch (typeof v) {
      case 'string':
        flag = v == '' || v == 'NULL' || v == 'UNDEFINED' || v == '{}';
        break;
      case 'number':
        flag = v == 0;
        break;
      case 'boolean':
        flag = !v;
        break;
      case 'object':
        flag = v == null || v.length == 0;
        break;
      case 'undefined':
        flag = true;
        break;
    }
    return !flag;
};

    /*数字相减*/
export function calculatorSub(a, b) {
  let c, d, e;
  try {
      c = a.toString().split(".")[1].length;
  } catch (f) {
      c = 0;
  }
  try {
      d = b.toString().split(".")[1].length;
  } catch (f) {
      d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (calculatorMul(a, e) - calculatorMul(b, e)) / e;
}
    /*数字相乘*/
export function calculatorMul(a, b) {
  let c = 0,
      d = a.toString(),
      e = b.toString();
  try {
      c += d.split(".")[1].length;
  } catch (f) {}
  try {
      c += e.split(".")[1].length;
  } catch (f) {}
  return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
