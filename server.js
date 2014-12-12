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
    console.log(message);
    //add message to stored messages array
    storedMessages.push(message);
    storedClients.forEach(function(each){
      each.send(message);
    })
    //connection.send(message);
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
