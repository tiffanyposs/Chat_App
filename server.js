//Server File

var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 3000});

var counter = 1;

console.log("listening on port 3000 (press CTRL+C to quit)");
///////
//ON CONNECTION
///////
server.on("connection", function(connection){
  console.log("Client Connected");
  //this logs a usernumber to each server
  connection.usernumber = "user_" + counter;
  counter++;

  storage(connection);


  ///////
  //ON MESSAGE
  ///////
  //listen for incoming messages
  connection.on("message", function(message){
    bannedWords(message, connection);
    sendMessage(message);
  });//end message


  ///////
  //ON CLOSE
  ///////
  connection.on("close", function(){
    console.log("Client Disconnected");
    removeClient(connection);

  });

});
/////////
//end connection
/////////

////////
//START FUNCTIONS
///////

//this is for stored messages and clients
var storedMessages = [];
var storedClients = [];
var storage = function(connection){
  storedClients.push(connection);
  storedMessages.forEach(function(each){
    connection.send(each);
  });
}

//this prints a message to the terminal,
//stores the messages in storedMessages
//and sends eachclient any incoming messages
var sendMessage = function(message){
  //message = replaceWords(message);
  message = multipleWords(message);
  storedMessages.push(message);
  storedClients.forEach(function(each){
    each.send(message);
  })
}

// this removes the client from storedClients when they close
var removeClient = function(connection){
  for(var i = 0; i < storedClients.length; i++){
    if(storedClients[i].usernumber === connection.usernumber){
      storedClients.splice(i, 1);
    }
  }
}


//this filters any 'banned words' within the badWords array and will
//boot off the the user if they use them
//!!!!!!!!
//NEED TO UPDATE THE WORDS
//could attempt to remove any commas or period so it will
//catch the word more, and to lowercase
//prevent it from sending to to other clients when they get booted off
//!!!!!!!!
var bannedWords = function(message, connection){
  var badWords = ["kitten", "apple", "burrito"];
  var hashedword = JSON.parse(message);
  var string = hashedword.msg.toLowerCase();
  var string_array = string.split(" ");
  for(x = 0; x < string_array.length; x++){
    badWords.forEach(function(each){
      if(each === string_array[x]){
        removeClient(connection);
        connection.close();
      }}
    )}
  }


//!!!!!!!!!!!
//this you may not need after builiding multipleWords function
//this does replaces single words words with new ones
var replaceWords = function(message){
  var hashedword = JSON.parse(message);
  if(hashedword.msg === "(yell)"){
    hashedword.msg = "AHHHH";
    message = JSON.stringify(hashedword);
  }
  return message;
}

//emoji list
var emoji = {
  yell: "Ahhhhh",
  tableflip: "(╯°□°）╯︵ ┻━┻",
  butterfly: "Ƹ̵̡Ӝ̵̨̄Ʒ",
  fish: "¸.·´¯`·.´¯`·.¸¸.·´¯`·.¸><(((º>",
  house: "__̴ı̴̴̡̡̡ ̡͌l̡̡̡ ̡͌l̡*̡̡ ̴̡ı̴̴̡ ̡̡͡|̲̲̲͡͡͡ ̲▫̲͡ ̲̲̲͡͡π̲̲͡͡ ̲̲͡▫̲̲͡͡ ̲|̡̡̡ ̡ ̴̡ı̴̡̡ ̡͌l̡̡̡̡.___",
  boombox: "♫♪.ılılıll|̲̅̅●̲̅̅|̲̅̅=̲̅̅|̲̅̅●̲̅̅|llılılı.♫♪",
  sleep: "(-.-)Zzz...",
}

// this will replace a word from a message with something else
var multipleWords = function(message){
  var hashedword = JSON.parse(message);
  var string = hashedword.msg;
  var array = string.split(" ");
  for(var i = 0; i < array.length; i++){
    if(array[i] === "(yell)"){
      array.splice(i, 1, emoji.yell)
    }
    else if(array[i] === "(tableflip)"){
      array.splice(i, 1, emoji.tableflip)
    }
    else if(array[i] === "(butterfly)"){
      array.splice(i, 1, emoji.butterfly)
    }
    else if(array[i] === "(fish)"){
      array.splice(i, 1, emoji.fish)
    }
    else if(array[i] === "(house)"){
      array.splice(i, 1, emoji.house)
    }
    else if(array[i] === "(boombox)"){
      array.splice(i, 1, emoji.boombox)
    }
    else if(array[i] === "(sleep)"){
      array.splice(i, 1, emoji.sleep)
    }

  }
    string = array.join(" ");
    hashedword.msg = string;
    message = JSON.stringify(hashedword);
    return message;
}

// var multipleWords = function(message){
//   var hashedword = JSON.parse(message);
//   var string = hashedword.msg;
//   var array = string.split(" ");
//   for(var i = 0; i < array.length; i++){
//     if(array[i] === "(yell)"){
//       array.splice(i, 1, "Ahhhh")
//     }
//   }
//   string = array.join(" ");
//   hashedword.msg = string;
//   message = JSON.stringify(hashedword);
//   return message;
// }
