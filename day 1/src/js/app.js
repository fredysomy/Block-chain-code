App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    return App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Hello.json", function (data) {
      var HelloArtifact = data;
      App.contracts.Hello = TruffleContract(HelloArtifact);
      App.contracts.Hello.setProvider(App.web3Provider);
      return App.display();
    });
  },
  display: function () {
    var ButtonInstance;
    // Load account data
    console.log("ButtonInstance world");
    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    App.contracts.Hello.deployed()
      .then(function (instance) {
        ButtonInstance = instance;
        return ButtonInstance.display();
      })
      .then(function (hello) {
        $("#hello").html("Your data: " + hello);
        return App.hi();
      })
      .catch(function (error) {
        console.warn(error);
      });
  },

  
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
