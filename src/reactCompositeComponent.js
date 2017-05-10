import initComponentInstance from './initComponentInstance';

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

export default ReactCompositeComponent