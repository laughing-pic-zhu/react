const _shouldComponentUpdate = function (preElement, nextElement) {
    if (preElement != null && nextElement != null) {
        const preType = typeof preElement;
        const nextType = typeof nextElement;
        if (preType === 'string' || preType === 'number') {
            return (nextType === 'string' || nextType === 'number');
        } else {
            return (nextType === 'object' && preType === nextType && preElement.key === nextElement.key)
        }
    }
    return false;
};

export {_shouldComponentUpdate}