App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== "undefined") {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("SimpleStorage.json", function (SimpleStorage) {
      App.contracts.SimpleStorage = TruffleContract(SimpleStorage);
      App.contracts.SimpleStorage.setProvider(App.web3Provider);
      return App.render();
    });
  },

  render: function () {
    var SimpleStorageInstance;

    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    App.contracts.SimpleStorage.deployed()
      .then(function (instance) {
        SimpleStorageInstance = instance;
        console.log("inside 1");
        return SimpleStorageInstance.setSmartContract({ from: App.account });
      })
      .then(function (result) {
        console.log("2");
        $("#data").html("Your string: " + result);
      });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
