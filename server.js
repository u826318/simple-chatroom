const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// 静态文件目录
app.use(express.static('public'));

// 处理 websocket 连接
io.on('connection', (socket) => {
  console.log('有新用户连接');
  
  // 接收到客户端消息后广播给所有连接的用户
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  
  socket.on('disconnect', () => {
    console.log('用户断开连接');
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log('服务器运行在端口：' + port);
});
