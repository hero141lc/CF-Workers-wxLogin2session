/* 
Modify this sample code or delete it to start from 
scratch. Click the “Examples” button on the right for 
inspiration.
  
Once you save and deploy your Worker, it will be available 
at [insert deployment URL here], and you can modify it 
from this web editor or the Wrangler CLI.
*/

// 定义微信小程序登录接口 URL
const WECHAT_LOGIN_URL = 'https://api.weixin.qq.com/sns/jscode2session';
// 定义微信小程序 appid
const WECHAT_APPID = '';
// 定义微信小程序 app secret
const WECHAT_APPSECRET = '';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    // 从请求中获取 code 参数
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    // 构造微信小程序登录请求的 URL
    const loginUrl = `${WECHAT_LOGIN_URL}?appid=${WECHAT_APPID}&secret=${WECHAT_APPSECRET}&js_code=${code}&grant_type=authorization_code`;

    // 发送请求获取登录信息
    const response = await fetch(loginUrl);
    const data = await response.json();

    // 将登录信息作为响应返回
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(error.message || error.toString(), { status: 500 });
  }
}
