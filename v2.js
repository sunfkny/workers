addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {

  //请求头部、返回对象
  let reqHeaders = new Headers(request.headers),
    outBody, outStatus = 200, outStatusText = 'OK', outCt = null, outHeaders = new Headers({
      "Access-Control-Allow-Headers": "Accept, Authorization, Cache-Control, Content-Type, DNT, If-Modified-Since, Keep-Alive, Origin, User-Agent, X-Requested-With, Token, x-access-token"
    });

  try {
    let url = "https://raw.githubusercontent.com/sunfkny/rthe/master/v2.html"
    //构建 fetch 参数
    let fp = {
      method: request.method,
      headers: {}
    }

    // 发起 fetch
    let fr = (await fetch(url, fp));
    outCt = "text/html;charset=UTF-8"
    outStatus = fr.status;
    outStatusText = fr.statusText;
    outBody = fr.body;
  } catch (err) {
    outCt = "application/json";
    outBody = JSON.stringify({
      code: -1,
      msg: JSON.stringify(err.stack) || err
    });
  }

  //设置类型
  if (outCt && outCt != "") {
    outHeaders.set("content-type", outCt);
  }

  return new Response(outBody, {
    status: outStatus,
    statusText: outStatusText,
    headers: outHeaders
  })

}
