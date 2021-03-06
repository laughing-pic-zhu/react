import React from './react/React';

const container = document.getElementById('container');

// const hello = function () {
//     console.log('hello react');
// };
//
// const Hello = React.createClass({
//     getInitialState: function () {
//         return {sex: '男', name: 'zhujian'}
//     },
//     componentWillMount: function () {
//         console.log('componentWillMount');
//     },
//     componentDidMount: function () {
//         console.log('componentDidMount');
//     },
//     render: function () {
//         console.log(this.props);
//         return React.createElement('div', {
//             id: 'test',
//             className: 'test',
//             onclick: hello,
//             type: 'aoteman',
//             key: Math.random()
//         }, 'Hello world', '性别:' + this.state.sex, '姓名:' + this.state.name, '身高:' + this.props.height);
//     }
// });


const element1 = React.createElement('div', {
    id: 'element1',
    className: 'element1',
    key: Math.random()
}, 'son1');
// const element2 = React.createElement('div', {
//     id: 'test',
//     className: 'test',
//     key: Math.random()
// }, 'son2');
//
//
// const element = React.createElement('div', {
//     id: 'test',
//     className: 'test',
//     onclick: hello,
//     key: Math.random()
// }, 'i am father', element1, element2);

// React.render(React.createElement(Hello, {height: '172'},111), container);
// React.render(element, container);
// React.render('222', container);
// React.render(element1, container);

const key = Math.random();

const Man = React.createClass({
    render: function () {
        return React.createElement('div', {}, 111)
    }
});

const Person = React.createClass({
    getInitialState: function () {
        return {sex: '男', name: 'zhujian'}
    },
    componentWillMount: function () {
        console.log('componentWillMount');
    },
    componentDidMount: function () {
        console.log('componentDidMount');
    },

    changeState: function () {
        this.setState({name: 'qianyi'});
    },

    render: function () {
        return React.createElement('div', {
            id: 'test',
            className: 'test',
            onClick: this.changeState.bind(this),
            my_attr: this.state.name,
            type: 'aoteman',
            key: key
        }, 'Hello world', '性别:' + this.state.sex, '姓名:' + this.state.name, '身高:' + this.props.height, element1, React.createElement(Man));
    }
});

React.render(React.createElement(Person, {height: '172', key: 'gg'}), container);