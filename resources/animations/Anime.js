const anime = require('animejs');

var elements = document.querySelectorAll('.');

anime({
  targets: elements,
  translateX: 270
});