const Chingari = artifacts.require("Chingari");

module.exports = function (deployer) {
  deployer.deploy(Chingari,'10000000000000000000000');
};
