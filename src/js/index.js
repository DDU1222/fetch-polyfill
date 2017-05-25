import 'index.scss';
import Assembled from './lib/assembled';
import App from 'index/app';
import Fetch from './lib/fetch';

console.log('app.js');

(() => {
  let view = {
    init() {
      this.render();
      this.bindEvent();
    },
    getData() {
      Fetch('/status')
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      })
    },
    postData() {
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
    },
    timeoutData() {
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
    },
    bindEvent() {
      $('.get-ajax').click(() => {
        console.log('click');
        this.getData();
      });
      $('.post-ajax').click(() => {
        console.log('click');
        this.postData();
      });
      $('.timeout-ajax').click(() => {
        console.log('click');
        this.timeoutData();
      });
      $('.get-get').click(() => {
        $('.code-get').show().siblings().hide();
      });
      $('.get-post').click(() => {
        $('.code-post').show().siblings().hide();
      });
      $('.get-timeout').click(() => {
        $('.code-timeout').show().siblings().hide();
      });
    },
    render() {
      $('#root').append(Assembled('app', {}));
    }
  }
  view.init();
})();

// build 时去掉  不然会报错 后期优化

module.hot.accept();
