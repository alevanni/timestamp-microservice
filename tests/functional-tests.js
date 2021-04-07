/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require("chai-http");
var chai = require("chai");
var assert = chai.assert;
var server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function() {
  suite("Routing Tests", function() {
    suite("GET /api/timestamp => conversion object", function() {
      test("Convert 2020-05-13 (valid input)", function(done) {
        console.log("prova");
        chai
          .request(server)
          .get("/api/timestamp/2020-05-13")
          .end(function(err, res) {
            console.log(res.text);
            assert.equal(res.status, 200);
            assert.equal(
              res.text,
              '\
{"unix":1589328000000,"utc":"Wed, 13 May 2020 00:00:00 GMT"}'
            );

            done();
          });
      });

      test("Convert no date (current timestamp)", function(done) {
        console.log("prova");
        chai
          .request(server)
          .get("/api/timestamp")
          .end(function(err, res) {
            console.log(res.text);
            var myDate = new Date();
            console.log(myDate);
            var json = { unix: myDate.getTime(), utc: myDate.toUTCString() };
            var resJson = JSON.parse(res.text);
            assert.equal(res.status, 200);
            //assert.equal(res.text,JSON.stringify(json) );
            assert.equal(resJson.utc, json.utc);
            assert.approximately(resJson.unix, json.unix, 1000);

            done();
          });
      });

      test("Convert no date (current timestamp)", function(done) {
        console.log("prova");
        chai
          .request(server)
          .get("/api/timestamp/2020-35-000")
          .end(function(err, res) {
            console.log(res.text);
            assert.equal(res.status, 200);
            assert.equal(res.text, '{"error":"Invalid Date"}');

            done();
          });
      });
    });
  });
});
