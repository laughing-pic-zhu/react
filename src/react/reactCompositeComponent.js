import initComponentInstance from './initComponentInstance';

const ReactCompositeComponent = function (_currentElement) {
    this._currentElement = _currentElement;
};

ReactCompositeComponent.prototype.mountComponent = function (id) {
    const _currentElement = this._currentElement;

    const {type:ReactClass, props} = _currentElement;
    const instance = new ReactClass(props);
    this._instance = instance;
    instance._reactCompositeComponentInstance = this;
    // const state=instance.getInitialState()||null;
    instance.componentWillMount();

    const renderedComponent = instance.render();
    this._renderedComponent = renderedComponent;
    const componentInstance = initComponentInstance(renderedComponent);

    $(document).one('documentReady', function () {
        instance.componentDidMount();
    });
    return componentInstance.mountComponent(id);
};

ReactCompositeComponent.prototype.receiveComponent = function (nextElement, nextState) {
    this._currentElement = nextElement || this._currentElement;
    const _instance = this._instance;
    const nextProps = _instance.props;
    const nextState = Object.assign({}, _instance.state, nextState);
    if (_instance.shouldComponentUpdate && _instance.shouldComponentUpdate(nextProps, nextState === false)) {
        return;
    }

    if (_instance.componentWillMount) {
        _instance.componentWillMount(nextProps, nextState)
    }

    this.state = nextState;

    const preRenderComponent = this._renderedComponent;
    const preElement = preRenderComponent._currentElement;
    const nextRenderComponent = this._renderedComponent;
    const renderedComponentElement = _instance.render();

    // _instance.state =
};

export default ReactCompositeComponent