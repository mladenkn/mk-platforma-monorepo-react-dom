Array.from(document.querySelectorAll('img'))
    .filter(i => i.width > 60 && i.height > 60)
    .map(i => i.src)
    