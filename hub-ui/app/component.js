module.exports = function () {
  var element = document.createElement('h1');

  element.className = 'pure-button border-color-me';
  element.innerHTML = 'Hello world';

  return element;
};