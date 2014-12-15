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
  var user_button = document.getElementById("user_button");


  //BUTTON EVENT LISTENER
  button.addEventListener("click", function(){
    sendMessage();
  })

  // ON PRESSING ENTER
  input.addEventListener("keypress", function(){
    if(event.keyCode === 13){
      button.click();
    }
  });

  //listens for incoming messages
  client.addEventListener("message", function(message) {
    createLi(message);
  });

});//end open connection
///////////



///////
//FUNCTIONS
///////
var createLi = function(message){
  var newMessage = JSON.parse(message.data);
  var ul = document.querySelector("ul");
  var li = document.createElement("li");
  li.innerText = newMessage.name + " " + newMessage.msg;
  ul.insertBefore(li, ul.firstChild);
}

var sendMessage = function(){
  var input = document.getElementById("input");
  var userInput = document.getElementById("username");
  var user_div = document.getElementById("user_div")
  var messageObject = {name: "Anonymous:", msg: input.value};
  //take messageObject, stringify and send to server
  if (userInput.value.trim() != "") {
    messageObject.name = userInput.value + ":";
    userInput.style.visibility="hidden";
    user_div.style.visibility="hidden";

  }
  //will only send something if the input actually has text
  if (input.value.trim() != "" && userInput.value.trim() != "") {
    client.send(JSON.stringify(messageObject));
  }
  //resets input box
  input.value = "";
}
