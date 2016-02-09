/**
 * Created by pengfei on 16/2/1.
 */
connection = {
    socket: null,
    genUid: function () {
        return '1454340350668702';
        //return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
    },
    init: function () {
        this.sessionid = this.genUid();

        //连接websocket后端服务器
        this.socket = io.connect(window.location.href);

        //告诉服务器端有用户登录
        this.socket.emit('bind', {sessionid: this.sessionid});

        //监听消息发送
        this.socket.on('message:' + this.sessionid, function (obj) {
            console.log("method=" + obj.method + ",url=" + obj.url + ",data=" + obj.data);
            update(obj);
        });
    }
};
connection.init();