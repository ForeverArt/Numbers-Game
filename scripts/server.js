var instructions = new Object;
instructions.startFindMatch = "startFindMatch";
instructions.onlineUserPrefix = "onlineUsers";



var http = require('http');

var clients = [];
var ips = [];

var matchQueue = [];


/**
 * HTTP server
 */
var server = http.createServer(function (request, response) {
});
server.listen(1337);

/**
 * socketio server
 */
var io = require("socket.io").listen(server);

io.on('connection', function (connection) {
  var ip = getIpByConn(connection);
  clients[ip] = connection; //将ip与连接对
  ips[ip] = ip;
  var onlineUserStr = getOnlineUserStr();
  connection.send(onlineUserPrefix(onlineUserStr));

  console.log("ip -- "+ ip +" has connected.");
  console.log("Online user : "+onlineUserNum());

  connection.on('message', function (message){
    console.log("Message From ip : "+ip+"\nContent: "+message);
    if (message == instructions.startFindMatch){

    }
  });

  connection.on('disconnect' ,function (socket) {
    delete clients[ip];//删除用户的连接
    delete ips[ip];
    console.log("关闭与ip: " + ip + " 的连接:");
    console.log("Online user : "+ clients.length);
    boradcastOnlineNum();
  });
});

function getIpByConn(connection){
  var address = connection.handshake.address;
  temp = address.split(':');
  var ip = temp[3];
  return ip;
}

function onlineUserNum(){
  var i = 0;
  for (var conn in clients){
    i++;
  }
  return i;
}

function getOnlineUserStr(){
  var str = new Array();
  for (var key in ips){
    str.push(ips[key]);
  }
  return str.join("-");
}

function onlineUserPrefix(str){
  return nstructions.onlineUserPrefix+"-"+str;
}

function broadcastOnlineNum(){
  for (var key in clients){
    clients[key].send(onlineUserPrefix(onlineUserStr));
  }
}
