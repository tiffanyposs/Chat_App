//Client File
//this is for local host
//var client = new WebSocket("ws://localhost:3000");
//this is for Digital Ocean
var client = new WebSocket("ws://tiffany.princesspeach.nyc:3000");

client.addEventListener("open", function() {
  console.log('connected');

  //HTML elements
  var body = document.querySelector("body");
  var ul = document.querySelector("ul");
  var button = document.getElementById("button");

  button.addEventListener("click", function(){
    var input = document.getElementById("input");
    //create messageObject with name and message
    var userInput = document.getElementById("username");

    var messageObject = {name: "Anonymous:", msg: input.value};
    //take messageObject, stringify and send to server

    if (userInput.value.trim() != "") {
      messageObject.name = userInput.value + ":";
    }

    //will only send something if the input actually has text
    if (input.value.trim() != "") {
      client.send(JSON.stringify(messageObject));
    }

    //resets input box
    input.value = "";
  })

  // on pressing enter
  input.addEventListener("keypress", function(){
    if(event.keyCode === 13){
      button.click();
    }
  });

  //listens for incoming messages
  client.addEventListener("message", function(message) {
    //recieves message from server and parses the data
    var newMessage = JSON.parse(message.data);

    console.log(newMessage);

    var ul = document.querySelector("ul");
    var li = document.createElement("li");

    li.innerText = newMessage.name + " " + newMessage.msg;
    //this will put the list element at the top of the list
    ul.insertBefore(li, ul.firstChild);
  });


});//end open connection
