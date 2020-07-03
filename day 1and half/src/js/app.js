App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== "undefined") {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("SimpleStorage.json", function (SimpleStorage) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.SimpleStorage = TruffleContract(SimpleStorage);
      // Connect provider to interact with contract
      App.contracts.SimpleStorage.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function () {
    var SimpleStorageInstance;

    // Load account data
    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.SimpleStorage.deployed()
      .then(function (instance) {
        SimpleStorageInstance = instance;
        console.log("inside 1");
        return App.setFunction();
      })
      .catch(function (error) {
        console.warn(error);
      });
  },
  setFunction: function () {
    App.contracts.SimpleStorage.deployed()
      .then(function (instance) {
        console.log("inside 2");
        return instance.setSmartContract({ from: App.account });
      })
      .then(function (result) {
        $("#data").html("Your string: " + result);
      })
      .catch(function (err) {
        console.error(err);
      });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
