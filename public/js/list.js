var List = React.createClass({
        getInitialState: function () {
            return {
                items: data
            }
        },
        render: function () {
            return (
                <div>
                    {this.state.items.map(function (item) {
                        return <Item data={item}/>;
                    })}
                </div>
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
        return (
            <li className="item" onClick={this.onClick}>
                <div>
                    <span className="method">{this.props.data.method}</span>
                    <span className={'code code-' + this.props.data.statusCode}>{this.props.data.statusCode}</span>
                    <span className="address">{this.props.data.url}</span>
                </div>
            </li>
        )
    }

});