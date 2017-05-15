const ReactTextComponent = function (str) {
    this.element = '' + str;
    this.rootNodeId = '';
};

ReactTextComponent.prototype.mountComponent = function (id) {
    this.rootNodeId = id;
    return $(document.createElement('span')).attr('data-reactid', id).html(this.element);
};

ReactTextComponent.prototype.receiveComponent = function (nextElement, nextState) {

};
export default ReactTextComponent;