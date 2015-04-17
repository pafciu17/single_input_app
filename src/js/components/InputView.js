var React = require('react'),
    _ = require('lodash'),
    classNames = require('classnames'),
    getStores = require('../getStores');

var InputView = React.createClass({

    getInitialState() {
        return {
            validationError: false
        }
    },

    getDefaultProps() {
        return {
            onSearch: _.noop
        }
    },

    searchPhraseIsValid(phrase) {
        return !!phrase;
    },

    markValidationError() {
        this.setState({
            validationError: true
        });
    },

    clearValidationError() {
        this.setState({
            validationError: false
        });
    },

    handleSubmit(e) {
        e.preventDefault();
        this.clearValidationError();
        var searchPhrase = this.refs.input.getDOMNode().value.trim();
        if (!this.searchPhraseIsValid(searchPhrase)) {
            this.markValidationError();
            return false
        }
        getStores(searchPhrase).then((stores) => {
            this.props.onSearch(searchPhrase, stores);
        });
    },

    render() {
        var inputClasss = classNames('search-form__input', {'search-form__input--error': this.state.validationError});
        return (
            <div className='input-view'>
                <h1>Search for alko store within Finland</h1>
                <form onSubmit={this.handleSubmit} className='search-form'>
                    <label>
                        <span className='search-form__label'>City name</span>
                        <input className={inputClasss} type='text' ref='input'/>
                    </label>
                    <input className='search-form__button' type='submit' value='Search' />
                </form>
            </div>
        );
    }

});

module.exports = InputView;