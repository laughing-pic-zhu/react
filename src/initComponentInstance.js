import ReactTextComponent from './reactTextComponent';
import ReactDomComponent from './reactDomComponent';
import ReactCompositeComponent from './reactCompositeComponent';


const initComponentInstance = function (node) {
    if (typeof node === 'string' || typeof node === 'number') {
        return new ReactTextComponent(node);
    } else if (typeof node === 'object' && typeof node.type === 'string') {
        return new ReactDomComponent(node);
    } else if (typeof node === 'function') {
        return new ReactCompositeComponent(node);
    }
};

export default initComponentInstance