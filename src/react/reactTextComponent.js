const ReactTextComponent = function (str) {
    this._currentElement = '' + str;
    this.rootNodeId = '';
};

ReactTextComponent.prototype.mountComponent = function (id, index) {
    const rootNodeId=this.rootNodeId = id + '.' + index;
    const realElement = this.realElement = $(document.createElement('span'));
    return realElement.attr('data-reactid', rootNodeId).html(this._currentElement);
};

ReactTextComponent.prototype.receiveComponent = function (nextElement) {
    const lastText = this._currentElement;
    const nextText = '' + nextElement;
    if (lastText !== nextText) {
        this._currentElement = nextText;
        this.realElement.html(nextText);
    }
};
export default ReactTextComponent;