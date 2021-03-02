export function move(elements, cb, options = {}) {
    const rects = new WeakMap();
    const prefix = getPrefix(options);
    if (elements instanceof HTMLCollection) {
        elements = Array.from(elements);
    }
    elements.forEach(el => {
        rects.set(el, el.getBoundingClientRect());
    });
    cb();
    elements.forEach(el => {
        const rect = rects.get(el);
        const top = rect.top - el.getBoundingClientRect().top;
        const left = rect.left - el.getBoundingClientRect().left;
        const style = el.style;
        style.transitionDuration = '0s';
        style.transform = `translate(${left}px, ${top}px)`;
        nextFrame(() => {
            el.classList.add(prefix + 'move');
            style.transitionDuration = style.transform = '';
            whenTransitionEnds(el, () => {
                el.classList.remove(prefix + 'move');
            });
        });
    });
}
export function animate(el, name, options = {}) {
    const prefix = getPrefix(options);
    el.classList.add(prefix + name + '-active');
    el.classList.add(prefix + name + '-from');
    el.classList.remove(prefix + 'move');
    nextFrame(() => {
        el.classList.add(prefix + name + '-to');
        el.classList.remove(prefix + name + '-from');
        whenTransitionEnds(el, () => {
            el.classList.remove(prefix + name + '-active');
            el.classList.remove(prefix + name + '-to');
            options.finish && options.finish();
        });
    });
}
export function hello(el, options = {}) {
    animate(el, 'enter', options);
}
export function goodbye(el, options = {}) {
    animate(el, 'leave', options);
}
function nextFrame(cb) {
    requestAnimationFrame(() => {
        requestAnimationFrame(cb);
    });
}
function whenTransitionEnds(el, resolve) {
    if (getComputedStyle(el).transitionDuration.startsWith('0s')) {
        resolve();
    }
    else {
        const end = () => {
            resolve();
            el.removeEventListener('transitionend', end);
        };
        el.addEventListener('transitionend', end);
    }
}
function getPrefix(options) {
    return options.classPrefix ? options.classPrefix + '-' : '';
}
