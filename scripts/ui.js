// record size
var record = new Object;
record.height = 20;
record.intervalY = 2;
record.dropbackColor = "rgba(0,0,0,0.2)";
// CardSize
var card = new Object;
card.width = 80;
card.height = 120;
card.selfColor = "#0080ff";
card.oppositeColor = "pink";
card.numColor = "black";
card.symbolColor = "white";
card.leftMargin = 80;
card.intervalX = 30;
card.arcRadius = 26;
card.arcStart = 0;
card.arcStop = 2*Math.PI;
card.arcWidth = 5;
card.triangleWidth = 4;
card.triangleLength = 52;
card.triangleOffset = 7;
card.borderWidth = 4;
card.selfBorderColor = "black";
card.oppositeBorderColor = "white";
card.selectedColor = "red";
card.fontWidth = 30;
card.font = "30px Arial";
card.fontColor = "white";
card.fontWidthOffset = 5;
card.fontHeightOffset = 10;

var card_lg = new Object;
card_lg.width = 80;
card_lg.height = 120;
card_lg.selfColor = "#0080ff";
card_lg.oppositeColor = "pink";
card_lg.numColor = "black";
card_lg.symbolColor = "white";
card_lg.leftMargin = 80;
card_lg.intervalX = 30;
card_lg.arcRadius = 26;
card_lg.arcStart = 0;
card_lg.arcStop = 2*Math.PI;
card_lg.arcWidth = 5;
card_lg.triangleWidth = 4;
card_lg.triangleLength = 52;
card_lg.triangleOffset = 7;
card_lg.borderWidth = 4;
card_lg.selfBorderColor = "black";
card_lg.oppositeBorderColor = "white";
card_lg.selectedColor = "red";
card_lg.fontWidth = 30;
card_lg.font = "30px Arial";
card_lg.fontColor = "white";
card_lg.fontWidthOffset = 4;
card_lg.fontHeightOffset = 10;

// 区域的间隔像素
var interValPixel = 2;
// 整体
var wholeArea = new Object();
wholeArea.x = 0;
wholeArea.y = 0;
wholeArea.width = 1280;
wholeArea.height = 720;
// 敌方区域
var oppositeArea = new Object;
oppositeArea.x = wholeArea.x;
oppositeArea.y = wholeArea.y;
oppositeArea.width = wholeArea.width;
oppositeArea.height = wholeArea.height/4 - interValPixel/2;
// 敌方头像区域
var oppositeHeadArea = new Object;
oppositeHeadArea.x = wholeArea.x;
oppositeHeadArea.y = wholeArea.y;
oppositeHeadArea.width = oppositeArea.height - interValPixel/2;
oppositeHeadArea.height = oppositeHeadArea.width;
// 敌方手牌区域
var oppositeCardArea = new Object;
oppositeCardArea.x = oppositeHeadArea.x + oppositeHeadArea.width + interValPixel;
oppositeCardArea.y = oppositeHeadArea.y
oppositeCardArea.width = oppositeArea.width - oppositeHeadArea.width - interValPixel/2;
oppositeCardArea.height = oppositeHeadArea.height;
// 中间区域
var middleArea = new Object;
middleArea.x = wholeArea.x;
middleArea.y = oppositeHeadArea.height + interValPixel;
middleArea.width = wholeArea.width;
middleArea.height = wholeArea.height/2 - interValPixel;
// onlineUserNumArea
var onlineUserNumArea = new Object;
onlineUserNumArea.x = wholeArea.x;
onlineUserNumArea.y = oppositeHeadArea.y + oppositeHeadArea.height + interValPixel;;
onlineUserNumArea.width = oppositeHeadArea.width;
onlineUserNumArea.height = 34;
onlineUserNumArea.fillColor = "brown";
onlineUserNumArea.font = "15px Arial";
onlineUserNumArea.fontColor = "white";
onlineUserNumArea.fontWidthOffset = 30;
onlineUserNumArea.fontHeightOffset = 23;
// 区域
var timeArea = new Object;
timeArea.x =  wholeArea.x;
timeArea.y = onlineUserNumArea.y+onlineUserNumArea.height+interValPixel;
timeArea.width = oppositeHeadArea.width;
timeArea.height = middleArea.height-onlineUserNumArea.height-interValPixel;
// 主舞台
var stageArea = new Object;
stageArea.x = oppositeCardArea.x
stageArea.y = onlineUserNumArea.y
stageArea.width = (middleArea.width - onlineUserNumArea.width)/4*3 - interValPixel/2;
stageArea.height = middleArea.height;
stageArea.fillColor = "gray";
// 记录区域
var recordArea = new Object;
recordArea.x = stageArea.x + stageArea.width + interValPixel;
recordArea.y = stageArea.y;
recordArea.width = middleArea.width - timeArea.width - stageArea.width;
recordArea.height = middleArea.height;
// 己方区域
var selfArea = new Object;
selfArea.x = wholeArea.x;
selfArea.y = timeArea.y + timeArea.height + interValPixel;
selfArea.width = wholeArea.width;
selfArea.height = wholeArea.height/4 - interValPixel/2;
// 头像区域
var headArea = new Object;
headArea.x = wholeArea.x;
headArea.y = selfArea.y;
headArea.width = oppositeHeadArea.width;
headArea.height = oppositeHeadArea.height;
// 手牌区域
var cardArea = new Object;
cardArea.x = oppositeCardArea.x;
cardArea.y = headArea.y;
cardArea.width = oppositeCardArea.width;
cardArea.height = oppositeCardArea.height;
// 状态描述文字
var statusDescriptionArea = new Object;
statusDescriptionArea.font = "50px Arial";
statusDescriptionArea.fontColor = "white";
statusDescriptionArea.fontWidthOffset = -250;
statusDescriptionArea.fontHeightOffset = 20;

























// 手牌位置记录
var selfCardPositions = new Array();
var oppositeCardPositions = new Array();
// record位置记录
var recordNum = 0;


// modify index.html
var statusDescription = "Connecting to server...";

// 执行
var c=document.getElementById("view");
var ctx=c.getContext("2d");
// showAllArea();
initialArea(ctx);
// 初始化手牌
initialCards(ctx);

testStageRecord();

// 初始化stageArea 初始化在线人数
updateStatus(ctx,0);
// repaintStage(ctx);




// 大小牌测试
function testStageRecord(){
  addRecord(ctx,1,1,1);
}
// 增加一条记录
function addRecord(ctx,leftIsOdd,rightIsOdd,isLeftWin){
  var leftX = recordArea.x;
  var leftY = recordArea.y+recordArea.intervalY*(1+recordNum)+record.height*recordNum;
  var rightX = recordArea.x+recordArea.width/2;
  var rightY = leftY;
  var width = recordArea.width/2;
  var height = record.height;
  if (leftIsOdd==1){
    drawCardBack_record(ctx,leftX,leftY,1);
  }else{
    drawCardBack_record(ctx,leftX,leftY,2);
  }
  if (rightIsOdd==1){
    drawCardBack_record(ctx,rightX,rightY,1);
  }else{
    drawCardBack_record(ctx,rightX,rightY,2);
  }
  if (isLeftWin==1){
    ctx.fillStyle = record.dropbackColor;
    ctx.fillRect(rightX, rightY, recordArea.width/2, record.height);
  }else{
    ctx.fillStyle = record.dropbackColor;
    ctx.fillRect(leftX, leftY, recordArea.width/2, record.height);
  }
  recordNum = recordNum+1;
}
// 展示区域属性
function showAllArea(){
  console.log(headArea);
  console.log(cardArea);
  console.log(oppositeHeadArea);
  console.log(oppositeCardArea);
  console.log(timeArea);
  console.log(stageArea);
  console.log(recordArea);
}
// 初始化
function initialArea(ctx){
  console.log("initialArea");
  //wholeArea
  ctx.fillStyle="white";
  ctx.fillRect(0,0,1280,720);
  //headArea
  ctx.fillStyle="blue";
  ctx.fillRect(headArea.x,headArea.y,headArea.width,headArea.height);
  var headImage = new Image();
  headImage.src = "images/default1.jpeg";
  headImage.onload = function () {
    ctx.drawImage(headImage,headArea.x,headArea.y,headArea.width,headArea.height);
  }
  //cardArea
  ctx.fillStyle="rgba(0,0,0,0.7)";
  ctx.fillRect(cardArea.x,cardArea.y,cardArea.width,cardArea.height);
  //oppositeHeadArea
  ctx.fillStyle="red";
  ctx.fillRect(oppositeHeadArea.x,oppositeHeadArea.y,oppositeHeadArea.width,oppositeHeadArea.height);
  var oppositeHeadImage = new Image();
  oppositeHeadImage.src = "images/default2.jpeg";
  oppositeHeadImage.onload = function () {
    ctx.drawImage(oppositeHeadImage,oppositeHeadArea.x,oppositeHeadArea.y,oppositeHeadArea.width,oppositeHeadArea.height);
  }
  //oppositeCardArea
  ctx.fillStyle="rgba(0,0,0,0.7)";
  ctx.fillRect(oppositeCardArea.x,oppositeCardArea.y,oppositeCardArea.width,oppositeCardArea.height);
  //timeArea
  ctx.fillStyle="brown";
  ctx.fillRect(timeArea.x,timeArea.y,timeArea.width,timeArea.height);
  //stageArea
  repaintStage(ctx);
  //recordArea
  ctx.fillStyle="rgba(0,255,0,0.2)";
  ctx.fillRect(recordArea.x,recordArea.y,recordArea.width,recordArea.height);
}
// 初始化手牌
function initialCards(ctx){
  console.log("initialCard");
  // 己方
  var firstX = cardArea.x + card.leftMargin;
  var y = cardArea.y + (cardArea.height - card.height)/2;
  for (var i=1;i<=9;i++){
    var tempx = firstX + (i-1)*(card.width + card.intervalX);
    drawCard(ctx,tempx,y,i,1);
    selfCardPositions[i-1] = new Array();
    selfCardPositions[i-1][0] = tempx;
    selfCardPositions[i-1][1] = y;
  }
  // 敌方
  firstX = oppositeCardArea.x + card.leftMargin;
  y = oppositeCardArea.y + (oppositeCardArea.height - card.height)/2;
  for (var i=1;i<=9;i++){
    drawCardBack(ctx,firstX + (i-1)*(card.width + card.intervalX),y,i,0);
    oppositeCardPositions[i-1] = new Array();
    oppositeCardPositions[i-1][0] = tempx;
    oppositeCardPositions[i-1][1] = y;
  }
  // console.log(selfCardPositions);
  // console.log(oppositeCardPositions);
}

function setCardSelected(ctx,x,y){
  // border
  ctx.lineWidth = card.borderWidth;
  ctx.strokeStyle = card.selectedColor;
  ctx.strokeRect(x, y, card.width, card.height);
}

function setCardUnSelected(ctx,x,y,belongSelf){
  // border
  ctx.lineWidth = card.borderWidth;
  // color
  if (belongSelf == 1){
    ctx.strokeStyle = card.selfBorderColor;
  }else{
    ctx.strokeStyle = card.oppositeBorderColor;
  }
  ctx.strokeRect(x, y, card.width, card.height);
}

function drawCard(ctx,x,y,cardNum,belongSelf){
  // border
  ctx.lineWidth = card.borderWidth;
  // color
  if (belongSelf == 1){
    ctx.fillStyle=card.selfColor;
    ctx.strokeStyle = card.selfBorderColor;
  }else{
    ctx.fillStyle=card.oppositeColor;
    ctx.strokeStyle = card.oppositeBorderColor;
  }
  ctx.fillRect(x, y, card.width, card.height);
  ctx.strokeRect(x, y, card.width, card.height);

  ctx.font="30px Arial";
  ctx.fillStyle=card.fontColor;
  ctx.fillText(cardNum,x+card.width/2-card.fontWidth/2+card.fontWidthOffset,y+card.height/2+card.fontHeightOffset);
}

function drawCard_lg(ctx,x,y,cardNum,belongSelf){

}

function drawCardBack(ctx,x,y,cardNum,belongSelf){
  // border
  ctx.lineWidth = card.borderWidth;
  // color
  if (belongSelf == 1){
    ctx.fillStyle=card.selfColor;
    ctx.strokeStyle = card.selfBorderColor;
  }else{
    ctx.fillStyle=card.oppositeColor;
    ctx.strokeStyle = card.oppositeBorderColor;
  }
  ctx.fillRect(x, y, card.width, card.height);
  ctx.strokeRect(x, y, card.width, card.height);

  if (cardNum%2==0){
    drawCircle(ctx,x,y);
  }else{
    drawTriangle(ctx,x,y);
  }
}

function drawCardBack_record(ctx,x,y,cardNum){

}

function drawCardBack_lg(ctx,x,y,cardNum,belongSelf){

}

function drawTriangle(ctx,x,y){
  // symbol triangle
  ctx.lineWidth = card.triangleWidth;
  ctx.strokeStyle = card.symbolColor;
  var temp = card.triangleLength/Math.sqrt(3);
  ctx.moveTo(x+card.width/2,y+card.height/2-temp+card.triangleOffset);
  ctx.lineTo(x+card.width/2-card.triangleLength/2,y+card.height/2+temp/2+card.triangleOffset);
  ctx.lineTo(x+card.width/2+card.triangleLength/2,y+card.height/2+temp/2+card.triangleOffset);
  ctx.lineTo(x+card.width/2,y+card.height/2-temp+card.triangleOffset);
  ctx.stroke();
}

function drawCircle(ctx,x,y){
  // symbol circle
  ctx.lineWidth = card.arcWidth;
  ctx.strokeStyle = card.symbolColor;
  ctx.beginPath();
  ctx.arc(x+card.width/2,y+card.height/2,card.arcRadius,card.arcStart,card.arcStop);
  ctx.stroke();
}

function updateStatus(ctx,status){
  if (status==-1){
    repaintStage(ctx);
    ctx.fillStyle = statusDescriptionArea.fontColor;
    ctx.font = statusDescriptionArea.font;
    statusDescription = 'Fail to connect server!';
    console.log(statusDescription);
    ctx.fillText(statusDescription,stageArea.x+stageArea.width/2+statusDescriptionArea.fontWidthOffset,stageArea.y+stageArea.height/2+statusDescriptionArea.fontHeightOffset);
  }else if (status==0){
    repaintStage(ctx);
    ctx.fillStyle = statusDescriptionArea.fontColor;
    ctx.font = statusDescriptionArea.font;
    statusDescription = 'Connecting to server...';
    console.log(statusDescription);
    ctx.fillText(statusDescription,stageArea.x+stageArea.width/2+statusDescriptionArea.fontWidthOffset,stageArea.y+stageArea.height/2+statusDescriptionArea.fontHeightOffset);
  }else if(status==1){
    repaintStage(ctx);
    ctx.fillStyle = statusDescriptionArea.fontColor;
    ctx.font = statusDescriptionArea.font;
    statusDescription = 'Loading Online Player...';
    console.log(statusDescription);
    ctx.fillText(statusDescription,stageArea.x+stageArea.width/2+statusDescriptionArea.fontWidthOffset,stageArea.y+stageArea.height/2+statusDescriptionArea.fontHeightOffset);
  }else if(status==2){
    repaintStage(ctx);

  }else if(status==3){

  }
}

function repaintStage(ctx){
  //stageArea
  ctx.fillStyle=stageArea.fillColor;
  ctx.fillRect(stageArea.x,stageArea.y,stageArea.width,stageArea.height);
}
function repaintOnlineUserNumArea(ctx){
  //stageArea
  ctx.fillStyle=onlineUserNumArea.fillColor;
  ctx.fillRect(onlineUserNumArea.x,onlineUserNumArea.y,onlineUserNumArea.width,onlineUserNumArea.height);
}
function updateOnlineNum(ctx,num){
  repaintOnlineUserNumArea(ctx);
  ctx.fillStyle = onlineUserNumArea.fontColor;
  ctx.font = onlineUserNumArea.font;
  var text = "当前在线人数: "+num;
  ctx.fillText(text,onlineUserNumArea.x+onlineUserNumArea.fontWidthOffset,onlineUserNumArea.y+onlineUserNumArea.fontHeightOffset);
}
