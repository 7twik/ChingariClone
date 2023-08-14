const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = "reduce sugar verb year agree cigar inflict coffee vital maple violin scrap";

module.exports = {
  contracts_build_directory: "../frontend/src/contracts/",
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 9545,            // Standard port (default: none)
      network_id: "*"     // Any network (default: none)
    },
    local: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard port (default: none)
      network_id: "1337",       // Any network (default: none)
    },
    sphinx: {
      provider: () => new HDWalletProvider(mnemonic, `https://dapps.shardeum.org/`),
      network_id: 8081,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas:6000000,
      gasLimit:6000000,
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      networkCheckTimeout: 10000,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },

   mocha: {
    
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.9",
      settings: { 
       evmVersion: 'byzantium', // Default: "petersburg"
        optimizer: {
          enabled: true,
          runs: 200
        },
      }, // A version or constraint - Ex. "^0.5.0"
    }
  }
}