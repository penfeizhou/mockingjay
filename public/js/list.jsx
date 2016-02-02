var List = React.createClass({
        getInitialState: function () {
            return {
                items: data
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
                <td className="time">{ new Date(this.props.data.time).toTimeString()}</td>
            </tr>
            </tbody>
        )
    }

});