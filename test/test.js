var chai = require("chai");
var expect = chai.expect;
var assert = chai.assert;
var ApiGatewayResponse = require("../index");

var callback = function(err, response) {
    return response;
};

describe("API Gateway Response", function() {
    describe("200 JSON response", function() {
        var testResponse = new ApiGatewayResponse(callback)
            .body({
                foo: "bar"
            })
            .send();

        it("should be an object", function() {
            expect(testResponse).to.be.a("object");
        });

        it("should have 200 status", function() {
            expect(testResponse).to.have.property("statusCode");
            expect(testResponse.statusCode).equals(200);
        });

        it("should have JSON body", function() {
            expect(testResponse).to.have.property("body");
            expect(testResponse.body).to.be.a("string");
            expect(JSON.parse(testResponse.body)["foo"]).equals("bar");
        });
    });

    describe("400 JSON response", function() {
        var testResponse = new ApiGatewayResponse(callback)
            .status(400)
            .body({
                foo: "bar"
            })
            .send();

        it("should be an object", function() {
            expect(testResponse).to.be.a("object");
        });

        it("should have 400 status", function() {
            expect(testResponse).to.have.property("statusCode");
            expect(testResponse.statusCode).equals(400);
        });

        it("should have JSON body", function() {
            expect(testResponse).to.have.property("body");
            expect(testResponse.body).to.be.a("string");
            expect(JSON.parse(testResponse.body)["foo"]).equals("bar");
        });
    });

    describe("200 JSON response with custom header", function() {
        var testResponse = new ApiGatewayResponse(callback)
            .headers({
                "x-access-token": "test"
            })
            .body({
                foo: "bar"
            })
            .send();

        it("should be an object", function() {
            expect(testResponse).to.be.a("object");
        });

        it("should have 200 status", function() {
            expect(testResponse).to.have.property("statusCode");
            expect(testResponse.statusCode).equals(200);
        });

        it("should have header x-access-token", function() {
            expect(testResponse).to.have.property("headers");
            expect(testResponse.headers).to.be.a("object");
            expect(testResponse.headers["x-access-token"]).equal("test");
        });

        it("should have JSON body", function() {
            expect(testResponse).to.have.property("body");
            var data = JSON.parse(testResponse.body);
            assert.equal(JSON.stringify(data), JSON.stringify({ foo: "bar" }));
        });
    });

    describe("200 JSON response with CORS", function() {
        var testResponse = new ApiGatewayResponse(callback)
            .enableCors()
            .body({
                foo: "bar"
            })
            .send();

        it("should be an object", function() {
            expect(testResponse).to.be.a("object");
        });

        it("should have 200 status", function() {
            expect(testResponse).to.have.property("statusCode");
            expect(testResponse.statusCode).equals(200);
        });

        it("should have header x-access-token", function() {
            expect(testResponse).to.have.property("headers");
            expect(testResponse.headers).to.be.a("object");
            expect(testResponse.headers["access-control-allow-origin"]).equal("*");
        });

        it("should have JSON body", function() {
            expect(testResponse).to.have.property("body");
            var data = JSON.parse(testResponse.body);
            assert.equal(JSON.stringify(data), JSON.stringify({ foo: "bar" }));
        });
    });

    describe("200 JSON response with custom header and CORS", function() {
        var testResponse = new ApiGatewayResponse(callback)
            .headers({
                "x-access-token": "test"
            })
            .body({
                foo: "bar"
            })
            .enableCors()
            .send();

        it("should be an object", function() {
            expect(testResponse).to.be.a("object");
        });

        it("should have 200 status", function() {
            expect(testResponse).to.have.property("statusCode");
            expect(testResponse.statusCode).equals(200);
        });

        it("should have x-access-token and cors headers", function() {
            expect(testResponse).to.have.property("headers");
            expect(testResponse.headers).to.be.a("object");
            expect(testResponse.headers["x-access-token"]).equal("test");
            expect(testResponse.headers["access-control-allow-origin"]).equal("*");
        });

        it("should have JSON body", function() {
            expect(testResponse).to.have.property("body");
            var data = JSON.parse(testResponse.body);
            assert.equal(JSON.stringify(data), JSON.stringify({ foo: "bar" }));
        });
    });
});
