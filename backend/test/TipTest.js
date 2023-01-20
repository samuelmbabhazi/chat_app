assert = require("assert");

Tip = require("../test/Tip.js").Tip; // program to test

// new unit test
describe("Check tip connection", function () {
  describe("sending connection", function () {
    it("should return Connexion à MongoDB réussie !", function () {
      var result = new Tip().connection();
      assert.equal("Connexion à MongoDB réussie !", result);
    });
  });
});
