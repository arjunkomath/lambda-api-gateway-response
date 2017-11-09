# API Gateway Response builder for AWS Lambda

[![Build Status](https://travis-ci.org/arjunkomath/lambda-api-gateway-response.svg?branch=master)](https://travis-ci.org/arjunkomath/lambda-api-gateway-response)
[![codecov](https://codecov.io/gh/arjunkomath/lambda-api-gateway-response/branch/master/graph/badge.svg)](https://codecov.io/gh/arjunkomath/lambda-api-gateway-response)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/192f9b1dfecc4329abbd41ce27710133)](https://www.codacy.com/app/arjunkomath/lambda-api-gateway-response?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=arjunkomath/lambda-api-gateway-response&amp;utm_campaign=Badge_Grade)

## Install

```
npm i lambda-api-gateway-response
```

## Usage

### Chainable methods

| Method        | Description                     | Default value |
| ------------- | ------------------------------- | ------------- |          
| status        | Set HTTP status code            | 200           |
| headers       | Set response headers            | -             |
| body          | Set response body               | null          |
| send          | Invoke callback                 | -             |

This

```javascript
new ApiGatewayResponse(callback)
    .status(200)
    .headers({
        'access-control-allow-origin': '*'
    })
    .body({
        "foo": "bar"
    })
    .send();
```

will be send as:

```javascript
{
    statusCode: 200,
    headers: {
        "access-control-allow-origin": "*"
    },
    body: {
        "foo": "bar"
    }
}
```
### Example

```javascript
var ApiGatewayResponse = require('lambda-api-gateway-response');

exports.myHandler = function(event, context, callback) {
 return new ApiGatewayResponse(callback)
    .status(200)
    .headers({
        'access-control-allow-origin': '*'
    })
    .body({
        "foo": "bar"
    })
    .send();
}
```
