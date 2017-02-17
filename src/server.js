const http = require('http');
const url = require('url');
const query = require('querystring');
// const htmlHandler = require('./htmlResponses.js');
const handler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': handler.getIndex,
  '/style.css': handler.getCss,
  '/success': handler.success,
  '/badRequest': handler.badRequest,
  '/unauthorized': handler.unauthorized,
  '/forbidden': handler.forbidden,
  '/internal': handler.internal,
  '/notImplemented': handler.notImplemented,
  notFound: handler.notFound,
};

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params, acceptedTypes);
  } else {
    urlStruct.notFound(request, response, params, acceptedTypes);
  }


//  switch (request.url) {
//    case '/':
//          // load client.html
//      handler.getIndex(request, response);
//      break;
//    case '/style.css':
//            // load style.css
//      response.writ
//            + eHead(200, { 'Content-Type': 'text/css' });
//      response.write(css);
//      response.end();
//      break;
//    case '/success':
//          // 200
//      htmlHandler.getIndex(request, response);
//      handler.success(request, response);
//      break;
//    case '/badRequest':
//          // if missing the query parameter ?valid=true 400
//          // if has the query parameter ?valid=true 200
//      htmlHandler.getIndex(request, response);
//      handler.badRequest(request, response);
//      break;
//    case '/unauthorized':
//          // if missing query parameter ?loggedIn=yes 401
//          // if has the query parameter ?loggedIn=yes 200
//      htmlHandler.getIndex(request, response);
//      handler.unauthorized(request, response);
//      break;
//    case '/forbidden':
//          // 403
//      htmlHandler.getIndex(request, response);
//      handler.forbidden(request, response);
//      break;
//    case '/internal':
//          // 500
//      htmlHandler.getIndex(request, response);
//      jsonResponse.internal(request, response);
//      break;
//    case '/notImplemented':
//          // 501
//      handler.notImplemented(request, response);
//      break;
//    default:
//          // 404
//      htmlHandler.getIndex(request, response);
//      handler.notFound(request, response);
//      break;
//  }
//
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

