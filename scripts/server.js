var instructions = new Object;
instructions.startFindMatch = "startFindMatch";
instructions.onlineUserPrefix = "onlineUsers";
instructions.firstGo = "firstGo";
instructions.notFirstGo = "notFirstGo";
instructions.matcherQuit = "matcherQuit";
instructions.InGamePrefix = "INGAME";



var http = require('http');

var clients = [];
var ips = [];

var matchQueue = [];

// inGameBin: [firstGo,notFirstGo]
var firsts = [];// [firstGo,firstGo]
var GameBins = [];// [firstIp->inGameBin]
var coupleArray = [];//[firstGo->notFirstGo]

/**
 * HTTP server
 */
var server = http.createServer(function (request, response) {});
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
  broadcastOnlineNum();

  console.log("ip -- "+ ip +" has connected.");
  console.log("Online user : "+onlineUserNum());

  connection.on('message', function (message){
    console.log("Message From ip : "+ip+"\nContent: "+message);
    var content = message.split("-");
    if (content.shift() == instructions.startFindMatch){
      matchQueue.push(ip);
      console.log("matchQueue:");
      console.log(matchQueue);
      if (matchQueue.length>0&&matchQueue.length%2==0){
        console.log("GET A MATCH.");
        var ip1 = matchQueue[0];
        var ip2 = matchQueue[1];
        matchQueue.shift();
        matchQueue.shift();

        var inGameBin = [];
        inGameBin.push(ip1);
        inGameBin.push(ip2);
        var random = parseInt(1*Math.random());
        var firstIp = ip1;
        var secondIp = ip2;
        if (random==0){
          firstIp = ip1;
          secondIp = ip2;
        }else{
          firstIp = ip2;
          secondIp = ip1;
        }
        firsts.push[firstIp];
        GameBins[firstIp] = inGameBin;
        coupleArray[firstIp] = secondIp;
        clients[firstIp].send(instructions.firstGo);
        clients[firstIp].send(instructions.notFirstGo);
        console.log("A MATCH START.");
        console.log(GameBins);
      }
    }
    else if (content.shift() == instructions.InGamePrefix){

    }
  });

  connection.on('disconnect' ,function (socket) {
    if (ifInGame(ip)){
      var oppositeIp = "";
      if (ifInFirst(ip)){
        oppositeIp = coupleArray[ip];
      }else{
        oppositeIp = findFirstBySecond(ip);
      }
      clients[ip].send(instructions.matcherQuit);
      if(oppositeIp){
        clients[oppositeIp].send(instructions.matcherQuit);
      }else{
        console.log("ERROR: Cannot find an oppositeIp!!!");
      }
      if (ifInFirst(ip)){
        delete coupleArray[ip];
        delete GameBins[ip];
        removeByValue(firsts,ip);
      }else{
        var first = findFirstBySecond(ip);
        delete coupleArray[first];
        delete GameBins[first];
        removeByValue(firsts,first);
      }
    }
    delete clients[ip];//删除用户的连接
    delete ips[ip];
    console.log("关闭与ip: " + ip + " 的连接:");
    console.log("Online user : "+ clients.length);
    broadcastOnlineNum();
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

function findFirstBySecond(ip){
  var i = firsts.length;
  while (i--) {
      if (coupleArray[firsts[i]] === ip) {
          return firsts[i];
      }
  }
  return null;
}

function ifInFirst(ip){
  var i = firsts.length;
  while (i--) {
      if (firsts[i] === ip) {
          return true;
      }
  }
  return false;
}

function ifInGame(ip){
  var i = firsts.length;
  while (i--) {
      if (firsts[i] === ip||coupleArray[firstsp[i]]==ip) {
          return true;
      }
  }
  return false;
}

function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}

function getOnlineUserStr(){
  var str = new Array();
  for (var key in ips){
    str.push(ips[key]);
  }
  return str.join("-");
}

function InGamePrefix(str){
  return instructions.InGamePrefix+"-"+str;
}

function onlineUserPrefix(str){
  return instructions.onlineUserPrefix+"-"+str;
}

function broadcastOnlineNum(){
  for (var key in clients){
    clients[key].send(onlineUserPrefix(getOnlineUserStr()));
  }
}
