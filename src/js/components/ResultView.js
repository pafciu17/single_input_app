var React = require('react'),
    classNames = require('classnames'),
    _ = require('lodash');

var ResultView = React.createClass({

    getDefaultProps() {
        return {
            searchParam: '',
            stores: [],
            onClose: _.noop,
            show: false
        }
    },

    getStoreDescription(store) {
        return [store.Address, store.PhoneNumber, store.OpeningHoursToday].join();
    },

    getStoreNodes() {
        return this.props.stores.map((store) => {
            return (
                <li key={store.Url} className='result-list__item'>
                    {this.getStoreDescription(store)}
                </li>
            )
        });
    },

    getStyle() {
        return {
            left: this.props.show ? 0 : window.innerWidth
        };
    },

    render() {
        var storeNodes = this.getStoreNodes();
        var listClasses = classNames('result-list', {'hidden': !this.props.stores.length});
        var noResultClasses = classNames({'hidden': this.props.stores.length});
        var viewClasses = classNames('result-view');
        var style = this.getStyle();
        return (
            <div className={viewClasses} style={style}>
                <div onClick={this.props.onClose}>Close &gt;&gt;</div>
                <h1>Search results for: {this.props.searchParam}</h1>
                <ul className={listClasses}>
                    {storeNodes}
                </ul>
                <div className={noResultClasses}>
                    No results
                </div>
            </div>
        );
    }
});

module.exports = ResultView;