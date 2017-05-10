import ReactElement from './reactElement';
import initComponentInstance from './initComponentInstance';
import ReactClass from './reactClass';

const React = {
    nextReactRootIndex: 0,
    createClass: function (spec) {
        const Constructor = function () {
        };
        Constructor.prototype = Object.assign({}, new ReactClass(), {constructor: Constructor}, spec);
        return Constructor;
    },
    createElement: function (tagName, props, textContent) {
        const key = props.key || '';
        const config = {};
        props.children = textContent;

        Object.keys(props).forEach(prop => {
            const value = props[prop];
            const exec = /^on(.+)/.exec(prop);
            if (exec && exec.length >= 2) {
                const key = exec[1];
                config[key] = value;
            } else if (prop !== 'key') {
                config[prop] = value;
            }
        });
        return new ReactElement(tagName, config, key);
    },
    render: function (str, container) {
        const componentInstance = initComponentInstance(str);
        $(container).append(componentInstance.mountComponent(React.nextReactRootIndex++));
        $(document).trigger('documentReady');
    }
};

window.React = React;
export default React;



