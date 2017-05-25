import Koa from 'koa';
import Router from 'koa-router';
import views from 'co-views';
import webpack from 'webpack';
import devMiddleware from 'koa-webpack-dev-middleware';
import hotMiddleware from 'koa-webpack-hot-middleware';
import convert from 'koa-convert';
import serve from 'koa-static';
import path from 'path';
import ip from 'ip';
import webpackConfigDev from './webpack.dev.config.babel.js';
import { getRouter } from './util';



let app = new Koa(),
  port = 3000,
  compiler = webpack(webpackConfigDev);

console.log('env:::', app.env);

app.use(convert(serve(`${__dirname}/src/js`)));

let render = views(`${__dirname}/views`, {
    map: {html: 'swig'}
});
let router = new Router();
let routers = getRouter();

routers.forEach((r) => {
  router.get(r.path, async ctx => ctx.body = await render(r.pointer));
});

router.get('/status', async ctx => {
  ctx.set({
    "Content-Type": "application/json"
  });
  ctx.body = {
    "message": "ok",
    "status": -1212,
    "data": {
      "userName": "DDU1222",
      "realName": "*晨雪",
      "avatar": "xxxxx",
      "hasAuth": true
    }
  };
});
router.post('/submit', async ctx => {
  ctx.set({
    "Content-Type": "application/json"
  });
  ctx.body = {
    "message": "ok",
    "status": 0,
    "data": {
      "token": ".-.-.---..-.-----....--.-.."
    }
  };
});

app
  .use(router.routes())
  .use(convert(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfigDev.output.publicPath,
    filename: 'bundle.js'
  })))
  .use(convert(hotMiddleware(compiler)));

app.on('error', (err,ctx) => {
  console.log(err);
}); 

app.listen(port, () => {
  console.log(`listen at port http://${ip.address()}:${port}`);
});
