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
    },

    setState: function (nextState) {
        const reactCompositeComponent = this._reactCompositeComponentInstance;
        reactCompositeComponent.receiveComponent(null, nextState)
    }

}, {constructor: ReactClass});

export default ReactClass;