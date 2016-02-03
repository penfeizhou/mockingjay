var Category = React.createClass({
    propTypes: {
        optionalObjectOf: React.PropTypes.shape({
            label: React.PropTypes.string,
            value: React.PropTypes.string,
            key: React.PropTypes.string
        })
    },
    getDefaultProps: function () {
        return {
            data: {}
        }
    },
    render: function () {
        function createMarkup(json) {
            if (!json) {
                return {};
            }
            return {__html: Process(json)};
        };

        return (
            <div className='category'>
                <div className='category-label'>
                    {this.props.label}
                </div>
                <div className='category-value' dangerouslySetInnerHTML={createMarkup(this.props.value)}></div>
            </div>
        )
    }
});

