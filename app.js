const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const CryptoJS = require('crypto-js')
const request = require('request-promise')
const testv = require('./do')

// 使用ctx.body解析中间件
app.use(bodyParser())

app.use( async ( ctx ) => {

  if ( ctx.url === '/' && ctx.method === 'GET' ) {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>微信跳一跳 获取你想得到的分数</h1>
      <form method="POST" action="/">
        <p>请填写session_id</p>
        <input name="session_id" /><br/>
        <p>请填写version</p>
        <input name="version" /><br/>
        <p>请输入想要的分数 小于100000</p>
        <input name="score" /><br/>
        <button type="submit">提交</button>
      </form>
    `
    ctx.body = html
  } else if ( ctx.url === '/' && ctx.method === 'POST' ) {
    // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
    let postData = ctx.request.body
    await testv.hackScore(postData)
    console.log(postData)
    ctx.body = '<h1>请关闭微信后 重新打开微信查看是否成功</h1>'
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})

app.listen(3000, () => {
  console.log('[demo] request post is starting at port 3000')
})