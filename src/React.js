const ReactElement = function (tagName, config, key) {
    this.tagName = tagName;
    this.props = config;
    this.key = key;
};

const ReactTextComponent = function (str) {
    this.element = '' + str;
    this.rootNodeId = '';
};

ReactTextComponent.prototype.mountComponent = function (id) {
    this.rootNodeId = id;
    return $(document.createElement('span')).attr('data-reactid', id).html(this.element);
};


const ReactDomComponent = function (reactElement) {
    this.element = reactElement;
};

ReactDomComponent.prototype.mountComponent = function (rootNodeId) {
    const {tagName, props, key} = this.element;
    const element = $(document.createElement(tagName));
    if (key) {
        this.rootNodeId = rootNodeId = key;
    } else {
        this.rootNodeId = rootNodeId;
    }
    Object.keys(props).forEach(prop => {
        const value = props[prop];
        if (prop === 'id') {
            element.attr('id', value);
        } else if (prop === 'className') {
            element.attr('class', value);
        } else if (prop === 'children') {
            element.html(value);
        } else {
            element.on(prop + '.' + rootNodeId, value);
        }
    });

    return element.attr('data-reactid', rootNodeId);
};


const initComponentInstance = function (str) {
    if (typeof str === 'string') {
        return new ReactTextComponent(str);
    } else if (typeof str === 'object') {
        return new ReactDomComponent(str);
    }
};

const React = {
    nextReactRootIndex: 0,
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
    }
};

window.React = React;
export default React;



