var instance = {
    sessions: {},
    sessionCount: 0
};
var websocket = {
    init: function (io) {
        instance.io = io;
        instance.emit = function (msg, obj) {
            instance.io.emit(msg, obj);
        };
        return this.handler;
    },
    handler: function (socket) {
        console.log('a session connected');
        //绑定
        socket.on('bind', function (obj) {
            //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
            socket.name = obj.sessionid;
            //检查在线列表，如果不在里面就加入
            if (!instance.sessions.hasOwnProperty(obj.sessionid)) {
                instance.sessions[obj.sessionid] = obj.sessionid;
                //在线人数+1
                instance.sessionCount++;
            }

            //向所有客户端广播用户加入
            instance.emit('bind', {sessions: instance.sessions, sessionCount: instance.sessionCount, session: obj});
            console.log(obj.sessionid + '已绑定');
        });

        //监听用户退出
        socket.on('unbind', function () {
            //将退出的用户从在线列表中删除
            if (instance.sessions.hasOwnProperty(socket.name)) {
                //退出用户的信息
                var obj = {sessionid: socket.name};

                //删除
                delete sessions[socket.name];
                //在线人数-1
                instance.sessionCount--;

                //向所有客户端广播用户退出
                emit('unbind', {sessions: instance.sessions, sessionCount: instance.sessionCount, session: obj});
                console.log(obj.sessionid + '已解绑');
            }
        });

        //监听用户发布聊天内容
        socket.on('message', function (obj) {
            //向所有客户端广播发布的消息
            emit('message', obj);
            console.log(obj.sessionid + '发布');
        });
    },
    instance: function () {
        return instance;
    }
};

module.exports = websocket;