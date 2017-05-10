const ReactElement = function (tagName, config, key) {
    this.type = tagName;
    this.props = config;
    this.key = key;
};

const ReactClass = function () {
};
ReactClass.prototype = Object.assign({}, {
    getInitialState: function () {
    },
    componentWillMount: function () {
    },
    componentDidMount: function () {
    },
    render: function () {
    }
}, {constructor: ReactClass});

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
    const {type, props, key} = this.element;
    const element = $(document.createElement(type));
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


const ReactCompositeComponent = function (reactClass) {
    this.reactClass = reactClass;
};

ReactCompositeComponent.prototype.mountComponent = function (id) {
    const ReactClass = this.reactClass;
    const instance = new ReactClass();
    instance.componentWillMount();

    const template = instance.render();
    const componentInstance = initComponentInstance(template);

    $(document).one('documentReady', function () {
        instance.componentDidMount();
    });
    return componentInstance.mountComponent(id);
};


const initComponentInstance = function (node) {
    if (typeof node === 'string' || typeof node === 'number') {
        return new ReactTextComponent(node);
    } else if (typeof node === 'object' && typeof node.type === 'string') {
        return new ReactDomComponent(node);
    } else if (typeof node === 'function') {
        return new ReactCompositeComponent(node);
    }
};

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



