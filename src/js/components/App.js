var React = require('react'),
    InputView = require('./InputView'),
    ResultView = require('./ResultView');

var App = React.createClass({

    getInitialState() {
        return {
            stores: []
        }
    },

    searchHandler(searchParam, stores) {
        this.setState({
            stores: stores,
            searchParam: searchParam,
            showResults: true
        });
    },

    closeResultViewHandler() {
        this.setState({
            showResults: false
        });
    },

    getAppStyle() {
        return {
            height: window.innerHeight
        };
    },

    render() {
        var appStyle = this.getAppStyle();
        return (
            <div className="app" style={appStyle}>
                <InputView onSearch={this.searchHandler} />
                <ResultView stores={this.state.stores} searchParam={this.state.searchParam}
                    show={this.state.showResults} onClose={this.closeResultViewHandler} />
            </div>
        );
    }
});

module.exports = App;