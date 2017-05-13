import React from './react/React';

const container = document.getElementById('container');

const hello = function () {
    console.log('hello react');
};

const Hello = React.createClass({
    getInitialState: function () {
        return {sex: '男', name: 'zhujian'}
    },
    componentWillMount: function () {
        console.log('componentWillMount');
    },
    componentDidMount: function () {
        console.log('componentDidMount');
    },
    render: function () {
        console.log(this.props);
        return React.createElement('div', {
            id: 'test',
            className: 'test',
            onclick: hello,
            type: 'aoteman',
            key: Math.random()
        }, 'Hello world', '性别:' + this.state.sex, '姓名:' + this.state.name,'身高:'+this.props.height);
    }
});

const element1 = React.createElement('div', {
    id: 'test',
    className: 'test',

    onclick: hello,
    key: Math.random()
}, 'click me');
const element2 = React.createElement('div', {
    id: 'test',
    className: 'test',
    onclick: hello,
    key: Math.random()
}, 'click me');


React.render(React.createElement(Hello, {height: '172'}), container);
React.render(element1, container);
React.render(element2, container);
React.render('222', container);