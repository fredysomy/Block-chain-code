App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",

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
    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });
    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".hello", App.helloFn);
    $(document).on("click", ".hi", App.hiFn);
  },

  hiFn: function (event) {
    var SimpleStorageInstance;
    event.preventDefault();

    App.contracts.SimpleStorage.deployed()
      .then(function (instance) {
        SimpleStorageInstance = instance;
        return SimpleStorageInstance.hi({ from: App.account });
      })
      .then(function (result) {
        $("#data").html("Your content: " + result);
      });
  },

  helloFn: function (event) {
    var SimpleStorageInstance;
    event.preventDefault();

    App.contracts.SimpleStorage.deployed()
      .then(function (instance) {
        SimpleStorageInstance = instance;
        return SimpleStorageInstance.hello({ from: App.account });
      })
      .then(function (result) {
        $("#data").html("Your content: " + result);
      });
  },
};

$(function () {
  $(window).load(function () {
    App.initWeb3();
  });
});
