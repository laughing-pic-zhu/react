const React = window.React;
const ReactDOM = window.ReactDOM;
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

const changeState = function () {
    this.setState({name: 'qianyi'});
};

const key = Math.random();

const Man = React.createClass({
    render: function () {
        return React.createElement('div', {key: 'xxx'}, 111, React.createElement('div', {key: 'vvv'}, 222))
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
    render: function () {
        return React.createElement('div', {
            id: 'test',
            className: 'test',
            onClick: changeState.bind(this),
            my_attr: this.state.name,
            type: 'aoteman',
            key: key
        }, 'Hello world', '性别:' + this.state.sex, '姓名:' + this.state.name, '身高:' + this.props.height, element1, React.createElement(Man, {key: 'hh'}));
    }
});

ReactDOM.render(React.createElement(Person, {height: '172', key: 'gg'}), container);