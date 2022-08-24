// alinlp
const { default: Client, GetNerChEcomRequest, GetTcChEcomRequest } = require('@alicloud/alinlp20200629');
const { Config } = require('@alicloud/openapi-client');


// express
var express = require('express');
var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

// socket
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

// connection
function newConnection(socket1){
  console.log('new connection' + socket1.id);
  socket1.on('getCategory', clientGetCategory);
  function clientGetCategory(data){
    console.log(data);
    nlp(data, socket1);
  }
}

// nlp
async function nlp(text1, socket1) {
  let config = new Config({
    // 您的AccessKey ID
    accessKeyId: '',
    // 您的AccessKey Secret
    accessKeySecret: '',
    // 访问的区域
    regionId: 'cn-hangzhou',
    endpoint: 'alinlp.cn-hangzhou.aliyuncs.com'
  });
  const client = new Client(config);
  const request = new GetTcChEcomRequest({
    serviceCode: "alinlp",
    text: text1,
  });
  const resp = await client.getTcChEcom(request);
  console.log(resp.body);
  var obj = JSON.parse(resp.body.data);
  var data =  obj.result.labelName;
  console.log("Tag is: ", data);
  io.sockets.emit('sendCategory', data);
}

