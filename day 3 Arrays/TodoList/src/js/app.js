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
    $.getJSON("Todolist.json", function (Todolist) {
      App.contracts.Todolist = TruffleContract(Todolist);
      App.contracts.Todolist.setProvider(App.web3Provider);
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
    $(document).on("click", ".submit", App.submit);
  },

  submit: function (event) {
    var TodoInstance;
    event.preventDefault();
    var task = String($("#task").val());
    console.log("values are", task);
    App.contracts.Todolist.deployed()
      .then(function (instance) {
        console.log("inside todo deployed");
        TodoInstance = instance;
        TodoInstance.addValue(task);
        return TodoInstance.show();
      })
      .then(function (result) {
        console.log("result is", result);
        $("#task").text(" ");
        $("ol").append("<li>" + result[result.length - 1] + "</li>");
      });
  },
};

$(function () {
  $(window).load(function () {
    App.initWeb3();
  });
});
