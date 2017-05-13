import initComponentInstance from './initComponentInstance';

const ReactCompositeComponent = function (reactElement) {
    this.reactElement = reactElement;
};

ReactCompositeComponent.prototype.mountComponent = function (id) {
    const reactElement= this.reactElement;

    const {type:ReactClass,props} = reactElement;
    const instance = new ReactClass(props);
    // const state=instance.getInitialState()||null;
    instance.componentWillMount();

    const template = instance.render();

    const componentInstance = initComponentInstance(template);


    $(document).one('documentReady', function () {
        instance.componentDidMount();
    });
    return componentInstance.mountComponent(id);
};

export default ReactCompositeComponent