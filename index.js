/**
 * @summary API Gateway Response builder for AWS Lambda
 * @author Arjun Komath <arjunkomath@gmail.com>
 *
 * Created at     : 2017-11-09 22:07:27
 * Last modified  : 2018-05-08 19:47:32
 */
const runtime = require('./runtime');

let ApiGatewayResponse = function(callback) {
    // Lambda callback function
    this.callback = callback;

    // Default response
    this.response = {
        statusCode: 200,
        headers: {},
        body: null
    };

    /**
     * HTTP status code
     * @param {number} statusCode
     */
    this.status = function (statusCode) {
        this.response.statusCode = statusCode;
        return this;
    };

    /**
     * Headers object
     * @param {object} headers
     */
    this.headers = function (headers) {
        this.response.headers = headers;
        return this;
    };

    /**
     * Response Body
     * @param {*} body
     */
    this.body = function (body) {
        this.response.body = JSON.stringify(body);
        return this;
    };

    this.enableCors = function (body) {
        this.response.headers = Object.assign(this.response.headers, {
            "access-control-allow-origin": "*"
        });
        return this;
    };

    /**
     * Invoke lambda callback
     */
    this.send = function () {
        if (runtime === "nodejs8.10") {
            return Promise.resolve(this.response);
        }
        return this.callback(null, this.response);
    };
};

module.exports = ApiGatewayResponse;
