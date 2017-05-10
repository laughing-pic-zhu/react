import React from './react/React';

const container = document.getElementById('container');

const hello = function () {
    console.log('hello react');
};

const Hello = React.createClass({
    componentWillMount: function () {
        console.log('componentWillMount');
    },
    componentDidMount: function () {
        console.log('componentDidMount');
    },
    render: function () {
        return React.createElement('div', {
            id: 'test',
            className: 'test',
            onclick: hello,
            key: Math.random()
        }, 'Hello world');
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


React.render(Hello, container);
React.render(element1, container);
React.render(element2, container);
React.render('222', container);