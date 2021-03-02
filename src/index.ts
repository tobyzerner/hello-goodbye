type AnimationOptions = {
    finish?: Function,
    classPrefix?: string
};

export function move(elements: HTMLCollection | Element[], cb: Function, options: AnimationOptions = {}) {
    const rects = new WeakMap<Element, DOMRect>();
    const prefix = getPrefix(options);

    if (elements instanceof HTMLCollection) {
        elements = Array.from(elements);
    }

    elements.forEach(el => {
        rects.set(el, el.getBoundingClientRect());
    });

    cb();

    elements.forEach(el => {
        const rect = rects.get(el)!;
        const top = rect.top - el.getBoundingClientRect().top;
        const left = rect.left - el.getBoundingClientRect().left;
        const style = (el as HTMLElement).style;
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

export function animate(el: HTMLElement, name: string, options: AnimationOptions = {}) {
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

export function hello(el: HTMLElement, options: AnimationOptions = {}) {
    animate(el, 'enter', options);
}

export function goodbye(el: HTMLElement, options: AnimationOptions = {}) {
    animate(el, 'leave', options);
}

function nextFrame(cb: () => void) {
    requestAnimationFrame(() => {
        requestAnimationFrame(cb);
    });
}

function whenTransitionEnds(el: Element, resolve: () => void) {
    if (getComputedStyle(el).transitionDuration.startsWith('0s')) {
        resolve();
    } else {
        const end = () => {
            resolve();
            el.removeEventListener('transitionend', end);
        };
        el.addEventListener('transitionend', end);
    }
}

function getPrefix(options?: AnimationOptions) {
    return options.classPrefix ? options.classPrefix + '-' : '';
}
