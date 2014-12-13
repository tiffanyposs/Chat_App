//Server File
var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 3000});

var storedMessages = [];
var storedClients = [];
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
  //this keeps tract of the connections
  storedClients.push(connection);

  storedMessages.forEach(function(each){
    connection.send(each);
  });


  ///////
  //ON MESSAGE
  ///////
  //listen for incoming messages
  connection.on("message", function(message){
    //var words = ["kitten", "fun", "stupid"]


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

// this removes the client from storedClients when they close
var removeClient = function(connection){
  for(var i = 0; i < storedClients.length; i++){
    if(storedClients[i].usernumber === connection.usernumber){
      storedClients.splice(i, 1);
    }
  }
}



var bannedWords = function(message, connection){
  var badWords = ["kitten", "apple", "burrito"];
  var hashedword = JSON.parse(message);
  var string = hashedword.msg;

  // could attment to make it remove the spaces
  var string_array = string.split(" ");
  for(x = 0; x < string_array.length; x++){
    badWords.forEach(function(each){
      if(each === string_array[x]){
        removeClient(connection);
        connection.close();
      }
    })
  }
}



var sendMessage = function(message){
  console.log(message);
  storedMessages.push(message);
  storedClients.forEach(function(each){
    each.send(message);
  })
}






  // var bannedWords = function(message, connection){
  //   var badWords = ["kitten", "apple", "burrito"];
  //   var hashedword = JSON.parse(message);
  //   var string = hashedword.msg;
  //
  //   var string_array = string.split(" ");
  //   for(x = 0; x < string_array.length; x++){
  //     badWords.forEach(function(each){
  //       if(each === string_array[x]){
  //         removeClient(connection);
  //         connection.close();
  //       }
  //     })
  //   }
  // }
