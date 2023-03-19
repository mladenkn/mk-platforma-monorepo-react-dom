function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

Array.from(document.querySelectorAll('img'))
    .filter(i => i.width > 60 && i.height > 60)
    .map(i => i.src)
    .filter(onlyUnique)
