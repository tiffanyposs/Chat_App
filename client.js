//Client File
//this is for local host
var client = new WebSocket("ws://localhost:3000");
//this is for Digital Ocean
//var client = new WebSocket("ws://tiffany.princesspeach.nyc:3000");

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
  client.addEventListener("message", function(message){
    messageLog(message);
  });

});//end open connection
///////////


///////
//FUNCTIONS
///////

//NEED TO CREATE A FUNCTION THAT FILTERS THOUGH ALL THE
//WORDS, MIGHT BE ONE FUNCTION THAT CALLS THE OTHERS
//I'VE CREATED


//this goes through all incoming messages and renders them depending
//on if there is an image, plain text, or link
var messageLog = function(message){
  var newMessage = JSON.parse(message.data);
  var msg_array = newMessage.msg.split(" ");
  var array = [];
  var ul = document.querySelector("ul");
  var li = document.createElement("li");
  //images
  msg_array.forEach(function(each){
    var end_digits = each.charAt(each.length-3) + each.charAt(each.length-2) + each.charAt(each.length- 1);
    var first_digits = each.charAt(0) + each.charAt(1) + each.charAt(2) + each.charAt(3);
    var ul = document.querySelector("ul");
    var li = document.createElement("li");
    //this renders images and gifs
    if(end_digits === "jpg" || end_digits === "png" || end_digits === "gif"){
      var img = document.createElement("img");
        img.setAttribute("src", each);
        img.style.width = "200px";
        li.innerHTML = newMessage.name + "    ";
        li.appendChild(img);
        ul.insertBefore(li, ul.firstChild);
      }
    //this renders links
    else if(first_digits === "http" || first_digits === "www."){
      var link = document.createElement("a");
        link.href = each;
        link.innerHTML = each;
        li.innerHTML = newMessage.name + "    ";
        li.appendChild(link);
        ul.insertBefore(li, ul.firstChild);
      }
    else{
      array.push(each);
    }
  });
    //this prints all other text
    if(array.length > 0){
      li.innerText = newMessage.name + "    " + array.join(" ");
      ul.insertBefore(li, ul.firstChild);
    }
  }




var sendMessage = function(){
  var input = document.getElementById("input");
  var userInput = document.getElementById("username");
  var user_div = document.getElementById("user_div");
  var message_div = document.getElementById("message_div");
  var messageObject = {name: "Anonymous:", msg: input.value};
  //take messageObject, stringify and send to server
  if (userInput.value.trim() != "") {
    messageObject.name = userInput.value + ":";
    userInput.style.visibility="hidden";
    user_div.style.visibility="hidden";
    message_div.style.visibility="visible";
  }
  //will only send something if the input actually has text
  if (input.value.trim() != "" && userInput.value.trim() != "") {
    client.send(JSON.stringify(messageObject));
  }
  //resets input box
  input.value = "";
}



// var imageRender = function(message){
//   var newMessage = JSON.parse(message.data);
//   var ul = document.querySelector("ul");
//   var li = document.createElement("li");
//   var msg_array = newMessage.msg.split(" ");
//   msg_array.forEach(function(each){
//     var end_digits = each.charAt(each.length-3) + each.charAt(each.length-2) + each.charAt(each.length- 1);
//     if(end_digits === "jpg" || end_digits === "png" || end_digits === "gif"){
//       var img = document.createElement("img");
//         img.setAttribute("src", each);
//         img.style.width = "200px";
//         li.appendChild(img);
//         ul.insertBefore(li, ul.firstChild);

//       }
//     })
//   }


// //NEEDS TO REMOVE THE IMAGE LINK NAME FORM THE MESSAGE ARRAY
// // needs to render all the options for images ex www etc
// var hyperLink = function(message){
//   var newMessage = JSON.parse(message.data);
//   var ul = document.querySelector("ul");
//   var li = document.createElement("li");
//   var msg_array = newMessage.msg.split(" ");
//     msg_array.forEach(function(each){
//     var first_digits = each.charAt(0) + each.charAt(1) + each.charAt(2) + each.charAt(3);
//       if(first_digits === "http" || first_digits === "www."){
//         var link = document.createElement("a");
//         link.href = each;
//         link.innerHTML = each;
//         li.innerText = newMessage.name;
//         li.appendChild(link);
//         ul.insertBefore(li, ul.firstChild);
//       }
//     });
//   }

// //RENDERS A REGULAR ARRAY
// var createLi = function(message){
//   var newMessage = JSON.parse(message.data);
//   var ul = document.querySelector("ul");
//   var li = document.createElement("li");
//     li.innerText = newMessage.name + " " + newMessage.msg;
//     ul.insertBefore(li, ul.firstChild);
// }
