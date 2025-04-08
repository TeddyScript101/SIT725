var expect = require("chai").expect;
var request = require("request");


describe("GET Cards API", function () {
    var url = "http://localhost:3000/cards";

    it("should return status 200", function (done) {
        request(url, function (error, response, body) {
            if (error) {
                console.error("Request error:", error);
                return done(error); // fails the test if there's a network/server error
            }

            try {
                expect(response.statusCode).to.equal(200);
                done();
            } catch (err) {
                done(err); // fails test with proper assertion error
            }
        });
    });
});

// describe('GET Cards API', () => {

//     it('should GET all cards', (done) => {
//         request()
//             .get('/cards')
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.be.an('array');
//                 expect(res.body[0]).to.have.property('title');
//                 expect(res.body[0]).to.have.property('image');
//                 expect(res.body[0]).to.have.property('link');
//                 expect(res.body[0]).to.have.property('description');
//                 done();
//             });
//     });
// });
