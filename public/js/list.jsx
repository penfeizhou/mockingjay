var List = React.createClass({
        getInitialState: function () {
            return {
                items: []
            }
        },
        render: function () {
            return (
                <table className='list'>
                    {this.state.items.map(function (item) {
                        return <Item data={item}/>;
                    })}
                </table>
            )
        }
    }
);
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
var Item = React.createClass({
    propTypes: {
        optionalObjectOf: React.PropTypes.shape({
            method: React.PropTypes.string,
            url: React.PropTypes.string,
            statusCode: React.PropTypes.number,
            data: React.PropTypes.string,
            header: React.PropTypes.objectOf(React.PropTypes.string)
        })
    },
    getDefaultProps: function () {
        return {
            data: {}
        }
    },
    onClick: function () {
        selected(this.props.data);
    },
    render: function () {
        var ret = /:\/\/([^\/]+?)(\/+[^\?]*)/.exec(this.props.data.url);
        var domain = ret[1];
        var path = ret[2];
        return (
            <tbody >
            <tr className="item">
                <td className="method">{this.props.data.method}</td>
                <td className={'code code-' + this.props.data.statusCode}>{this.props.data.statusCode}</td>
                <td className="domain" onClick={this.onClick}>{domain}</td>
                <td className="path" onClick={this.onClick}>{path}</td>
                <td className="status">{this.props.data.status}</td>
                <td className="cost">{this.props.data.cost + 'ms'}</td>
                <td className="time">{ new Date(this.props.data.time).format('MM-dd hh:mm:ss')}</td>
            </tr>
            </tbody>
        )
    }

});