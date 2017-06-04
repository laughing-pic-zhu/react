import ReactElement from './reactElement';
import initComponentInstance from './initComponentInstance';
import ReactClass from './reactClass';

const React = {
    nextReactRootIndex: 0,
    createClass: function (spec) {
        const Constructor = function (props) {
            this.props = props;
            this.state = this.getInitialState ? this.getInitialState() : {};
        };
        Constructor.prototype = Object.assign(new ReactClass(), {constructor: Constructor}, spec);
        return Constructor;
    },
    createElement: function (tagName, props, ...textContent) {
        props=props||{};
        const key = props.key || '';
        const config = {};
        props.children = textContent;

        Object.keys(props).forEach(prop => {
            const value = props[prop];
            if (prop !== 'key') {
                config[prop] = value;
            }
        });
        return new ReactElement(tagName, config, key);
    },
    render: function (str, container) {
        const componentInstance = initComponentInstance(str);
        $(container).append(componentInstance.mountComponent('',React.nextReactRootIndex++));
        $(document).trigger('documentReady');
    }
};

window.React = React;
export default React;



