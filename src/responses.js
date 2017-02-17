const fs = require('fs');


const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getCss = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};


// xml response
const respond = (request, response, status, content, type) => {
  if (type === 'text/xml') {
    response.writeHead(status, { 'Content-Type': 'text/xml' });

    let responseXML = '<response>';
    if (content.id) {
      responseXML = `${responseXML} <id>${content.id}</id>`;
    }
    responseXML = `${responseXML} <message>${content.message}</message>`;
    responseXML = `${responseXML} </response>`;
    response.write(responseXML);
  } else {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(content));
  }
  response.end();
};


// const respondXML = (request, response) => {
//    let responseXML = '<response>';
//    responseXML = `${responseXML} <id>${}</id>`;
// }


// function to send a json object
// const respondJSON = (request, response, status, object) => {
//  response.writeHead(status, { 'Content-Type': 'application/json' });
//  // stringify the object (so it doesn't use references/pointers/etc) and write the response
//  response.write(JSON.stringify(object));
//  response.end();
// };

// function to show a success status code
const success = (request, response, params, type) => {
  // message to send
  const responseJSON = {
    message: 'This is a successful response',
  };

  // send our json with a success status code
  respond(request, response, 200, responseJSON, type);
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, params, type) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    return respond(request, response, 400, responseJSON, type);
  }

  // if the parameter is here, send json with a success status code
  return respond(request, response, 200, responseJSON);
};

// function to show a bad request without the correct parametersx
const unauthorized = (request, response, params, type) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a loggedIn=yes query parameter
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // set our error message
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    // give the error a consistent id
    responseJSON.id = 'unauthorized';
    // return our json with a 401 bad request code
    return respond(request, response, 401, responseJSON, type);
  }

  // if the parameter is here, send json with a success status code
  return respond(request, response, 200, responseJSON, type);
};


// forbidden
const forbidden = (request, response, params, type) => {
  const responseJSON = {
    message: 'This page is forbidden.',
    id: 'forbidden',
  };

    // return a 403
  respond(request, response, 403, responseJSON, type);
};

// function to show not found error
const internal = (request, response, params, type) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'There was an internal error, please try again.',
    id: 'internal',
  };

  // return our json with a 500 not found error code
  respond(request, response, 500, responseJSON, type);
};

// function to show not found error
const notImplemented = (request, response, params, type) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'We didn\'t do that, stop it!',
    id: 'notImplemented',
  };

  // return our json with a 404 not found error code
  respond(request, response, 501, responseJSON, type);
};

// function to show not found error
const notFound = (request, response, params, type) => {
  // error message with a description and consistent error id
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return our json with a 404 not found error code
  respond(request, response, 404, responseJSON, type);
};

// exports to set functions to public
module.exports = {
  getIndex,
  getCss,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};

