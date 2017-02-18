var instructions = new Object;
instructions.startFindMatch = "startFindMatch";
instructions.onlineUserPrefix = "onlineUsers";


// my color assigned by the server
var myColor = false;
// my name sent to the server
var myName = false;
var connection = null;
var currentToUser = null;

var status = 0;

var onlineUsers = new Array();

connectToServer();
window.onbeforeunload = beforeDisConnect;//监听浏览器关闭前的事件
window.onunload = disConnect;//监听浏览器关闭时

function connectToServer() {
  updateStatus(ctx,status);
    // open connection
    connection = io.connect('http://127.0.0.1:1337', { 'reconnect': false });
    connection.on('connect', function (data) {
        // update ui
        status = 1;
        updateStatus(ctx,status);
        // connection.send(instructions.startFindMatch);
    });

    connection.on("error", function (error) {
      // update ui
      status = -1;
      updateStatus(ctx,status);
    });

    // most important part - incoming messages
    connection.on("message", function (message) {
      var content = message.split("-");
      if (content.shift()==instructions.onlineUserPrefix){
        onlineUsers = content;
        updateOnlineNum(ctx,onlineUsers.length);
        if (status == 1){
          // 第一次load完毕时stage画面需要变化，其他时候并不需要
          status = 2;
          updateStatus(ctx,status);
        }
      }else if(content.shift()==instructions.startFindMatch){

      }
    });
}

function disConnect(){
  console.log("Disconnecting...");
  connection.disconnect();
}

function beforeDisConnect() {
  return "确认离开";
}