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
    $.getJSON("Todo.json", function (Todo) {
      App.contracts.Todo = TruffleContract(Todo);
      App.contracts.Todo.setProvider(App.web3Provider);
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
    $(document).on("click", ".div", App.div);
    $(document).on("click", ".add", App.add);
    $(document).on("click", ".sub", App.sub);
    $(document).on("click", ".mul", App.mul);
  },

  add: function (event) {
    var TodoInstance;
    event.preventDefault();
    var a = parseInt($("#a").val(), 10);
    var b = parseInt($("#b").val(), 10);
    console.log("values are", a, b);
    App.contracts.Todo.deployed()
      .then(function (instance) {
        TodoInstance = instance;
        return TodoInstance.add(a, b);
      })
      .then(function (r) {
        return TodoInstance.show({ from: App.account });
      })
      .then(function (result) {
        $("#data").html("Your content: " + result);
      });
  },

  sub: function (event) {
    var TodoInstance;
    event.preventDefault();
    var a = parseInt($("#a").val(), 10);
    var b = parseInt($("#b").val(), 10);
    console.log("values are", a, b);
    App.contracts.Todo.deployed()
      .then(function (instance) {
        TodoInstance = instance;
        return TodoInstance.sub(a, b);
      })
      .then(function (r) {
        return TodoInstance.show({ from: App.account });
      })
      .then(function (result) {
        $("#data").html("Your content: " + result);
      });
  },

  mul: function (event) {
    var TodoInstance;
    event.preventDefault();
    var a = parseInt($("#a").val(), 10);
    var b = parseInt($("#b").val(), 10);
    console.log("values are", a, b);
    App.contracts.Todo.deployed()
      .then(function (instance) {
        TodoInstance = instance;
        return TodoInstance.mul(a, b);
      })
      .then(function (r) {
        return TodoInstance.show({ from: App.account });
      })
      .then(function (result) {
        $("#data").html("Your content: " + result);
      });
  },

  div: function (event) {
    console.log("entered");
    var TodoInstance;
    event.preventDefault();
    var a = parseInt($("#a").val(), 10);
    var b = parseInt($("#b").val(), 10);
    console.log("values are", a, b);
    App.contracts.Todo.deployed()
      .then(function (instance) {
        TodoInstance = instance;
        return TodoInstance.div(a, b);
      })
      .then(function (r) {
        return TodoInstance.show({ from: App.account });
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
