import initComponentInstance from './initComponentInstance';

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
            if (Array.isArray(value) && value.length > 1) {
                let sonId = 0;
                const sonElement=[];
                value.forEach(item=>{
                    const componentInstance = initComponentInstance(item);
                    sonElement.push(componentInstance.mountComponent(rootNodeId + '.' + sonId++));
                });
                element.html(sonElement);
            }else{
                element.html(value);
            }
        } else {
            element.on(prop + '.' + rootNodeId, value);
        }
    });

    return element.attr('data-reactid', rootNodeId);
};

ReactDomComponent.prototype.receiveComponent = function () {

};

export default ReactDomComponent;