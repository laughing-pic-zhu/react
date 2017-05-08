import React from './React';

const hello = function () {
    console.log('hello react');
}
// React.render('test', document.getElementById('container'));
const element1 = React.createElement('div', {id: 'test', className: 'test', onclick: hello,key:Math.random()}, 'click me');
const element2 = React.createElement('div', {id: 'test', className: 'test', onclick: hello,key:Math.random()}, 'click me');
React.render(element1, document.getElementById('container'));
React.render(element2, document.getElementById('container'));
React.render('222', document.getElementById('container'));