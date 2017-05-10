const ReactElement = function (tagName, config, key) {
    this.type = tagName;
    this.props = config;
    this.key = key;
};

export default ReactElement