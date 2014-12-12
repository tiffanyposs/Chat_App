//Server File
var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 3000});

var storedMessages = [];
var storedClients = [];
//!!!!!!!!!
/*
WORKS SENDING FILES TO EACHOTHER, BUT NEEDS TO ADD A FUNCTION
THAT REMOVES EACH CLIENT FROM THE storedClients LIST OR IT WILL
CRASH

NEED TO MAKE A COUNTER OUTSIDE OF THE SERVER ON AND ADD A KEY VALUE PAIR
THAT WILL ASSIGN THAT NUMBER AS A VALUE, SO YOU CAN LATER REFERENCE ITS
OWN NUMBER TO REMOVE ITSELF FROM THE storedClients LIST UPON CLOSE!
*/
//!!!!!!!!

console.log("listening on port 3000 (press CTRL+C to quit)");

server.on("connection", function(connection){
  console.log("Client Connected");

  //this keeps tract of the connections
  storedClients.push(connection);

  storedMessages.forEach(function(each){
    connection.send(each);
  });

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


  connection.on("close", function(){
    console.log("Client Disconnected");

  });

});//end connection
