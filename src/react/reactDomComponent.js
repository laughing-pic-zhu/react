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

export default ReactDomComponent;