import initComponentInstance from './initComponentInstance';
import {_shouldComponentUpdate} from './util';

const ReactCompositeComponent = function (_currentElement) {
    this._currentElement = _currentElement;
};

ReactCompositeComponent.prototype.mountComponent = function (rootNodeId, index) {
    const _currentElement = this._currentElement;
    const key = this._currentElement.key;
    if (key) {
        rootNodeId = rootNodeId + '.' + key;
    } else {
        this._currentElement.key = index;
        rootNodeId = rootNodeId + '.' + index;
    }
    this._rootNodeId = rootNodeId;
    const {type:ReactClass, props} = _currentElement;
    const instance = new ReactClass(props);
    this._instance = instance;
    instance._reactCompositeComponentInstance = this;
    // const state=instance.getInitialState()||null;
    instance.componentWillMount();

    const renderedElement = instance.render();
    this._renderedElement = renderedElement;
    const componentInstance = initComponentInstance(renderedElement);
    this._renderedComponent = componentInstance;
    $(document).one('documentReady', function () {
        instance.componentDidMount();
    });
    return componentInstance.mountComponent(rootNodeId);
};

ReactCompositeComponent.prototype.receiveComponent = function (nextElement, nextState) {
    this._currentElement = nextElement || this._currentElement;
    const _instance = this._instance;
    const nextProps = _instance.props;
    nextState = Object.assign({}, _instance.state, nextState);
    if (_instance.shouldComponentUpdate && _instance.shouldComponentUpdate(nextProps, nextState === false)) {
        return;
    }

    if (_instance.componentWillMount) {
        _instance.componentWillMount(nextProps, nextState)
    }

    _instance.state = nextState;

    const preRenderComponent = this._renderedComponent;
    const preElement = preRenderComponent._currentElement;

    const renderedComponentElement = _instance.render();
    if (_shouldComponentUpdate(preElement, renderedComponentElement)) {
        preRenderComponent.receiveComponent(renderedComponentElement);
        _instance.componentDidUpdate && _instance.componentDidUpdate()
    } else {
        const _rootNodeId = this._rootNodeId;
        const componentInstance = initComponentInstance(renderedComponentElement);
        const nextDom = componentInstance.mountComponent(_rootNodeId);
        $('[data-reactid=' + _rootNodeId + ']').replaceWith(nextDom);
    }
    // _instance.state =
};

export default ReactCompositeComponent