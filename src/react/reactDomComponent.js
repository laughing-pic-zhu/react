import initComponentInstance from './initComponentInstance';
const ReactDomComponent = function (reactElement) {
    this._currentElement = reactElement;
};

ReactDomComponent.prototype.mountComponent = function (rootNodeId, index) {
    rootNodeId=rootNodeId||'';
    const {type, props, key} = this._currentElement;
    const element = this.realElement = $(document.createElement(type));
    if (key) {
        rootNodeId = rootNodeId + '.' + key;
    } else {
        if (index || index === 0) {
            rootNodeId = rootNodeId + '.' + index;
        }
    }
    this.rootNodeId = rootNodeId;
    Object.keys(props).forEach(prop => {
        const value = props[prop];
        if (prop === 'className') {
            element.attr('class', value);
        } else if (prop === 'children') {
            this.oldChildren = value;
            if (Array.isArray(value) && value.length > 1) {
                let sonId = 0;
                const sonElement = [];
                value.forEach(item => {
                    const componentInstance = initComponentInstance(item);
                    sonElement.push(componentInstance.mountComponent(rootNodeId, sonId++));
                });
                element.html(sonElement);
            } else {
                element.html(value);
            }
        } else {
            const exec = /^on(.+)/.exec(prop);
            if (exec && exec.length >= 2) {
                const key = exec[1];
                element.on(key + '.' + rootNodeId, value);
            } else {
                element.attr(prop, value);
            }
        }
    });

    return element.attr('data-reactid', rootNodeId);
};

ReactDomComponent.prototype.receiveComponent = function (nextElement) {
    const nextProps = nextElement.props;
    const lastProps = this._currentElement.props;
    this._currentElement = nextElement;
    this._updateDOMProperties(lastProps, nextProps);
    this._updateDOMChildren(nextElement.props.children);
};

ReactDomComponent.prototype._updateDOMProperties = function (lastProps, nextProps) {
    const realElement = this.realElement;
    const rootNodeId = this.rootNodeId;
    Object.keys(lastProps).forEach(key => {
        if (!nextProps.hasOwnProperty(key)) {
            if (/^on.+$/.test(key)) {
                let prop = /^on(.+)$/.exec(key)[1];
                realElement.off(prop);
            } else {
                realElement.removeAttr(key);
            }
        }
    });

    Object.keys(nextProps).forEach(key => {
        const nextValue = nextProps[key];
        const lastValue = lastProps[key];
        if (key === 'children') {
            return
        }
        ;

        if (!lastProps.hasOwnProperty(key)) {
            if (/^on.+$/.test(key)) {
                let prop = /^on(.+)$/.exec(key)[1];
                realElement.on(prop + '.' + rootNodeId, nextValue);
            } else {
                realElement.attr(key, nextValue);
            }
        } else if (nextValue !== lastValue) {
            if (/^on.+$/.test(key)) {
                let prop = /^on(.+)$/.exec(key)[1];
                realElement.off(prop + '.' + rootNodeId);
                realElement.on(prop + '.' + rootNodeId, nextValue);
            } else {
                realElement.attr(key, nextValue);
            }
        }
    });
};

ReactDomComponent.prototype._flattenChildren = function (children) {
    const domContainer = {};
    children.forEach((item, index) => {
        const key = item.key ? item.key : index;
        domContainer[key] = item;
    });
    return domContainer;
};

ReactDomComponent.prototype._updateDOMChildren = function (children) {
    const sonElement = [];
    const rootNodeId = this.rootNodeId;
    const realElement = this.realElement;
    const oldChildren = this.oldChildren;
    const oldFlattenChildren = this._flattenChildren(oldChildren);
    console.log(oldFlattenChildren);
    let sonId = 0;
    children.forEach((item, index) => {
        if (typeof item === 'object') {
            const key = item.key;
            const oldInstance = oldFlattenChildren[key];
            if (!oldInstance) {

            }
        } else {

        }
        const componentInstance = initComponentInstance(item);
        sonElement.push(componentInstance.mountComponent(rootNodeId + '.' + sonId++));
    });
    realElement.html(sonElement);
};


export default ReactDomComponent;