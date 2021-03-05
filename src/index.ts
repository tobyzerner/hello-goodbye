type TransitionOptions = {
    finish?: Function,
    prefix?: string
};

function forceReflow(): void {
    void document.body.offsetWidth;
}

export function move(elements: HTMLCollection | HTMLElement[], cb: Function, options: TransitionOptions = {}) {
    const rects = new WeakMap<Element, DOMRect>();
    const prefix = getPrefix(options);

    if (elements instanceof HTMLCollection) {
        elements = Array.from(elements) as HTMLElement[];
    }

    elements.forEach(el => {
        rects.set(el, el.getBoundingClientRect());
    });

    cb();

    elements.forEach(el => {
        const rect = rects.get(el)!;
        const dx = rect.left - el.getBoundingClientRect().left;
        const dy = rect.top - el.getBoundingClientRect().top;

        if (! dx && ! dy) return;

        const style = (el as HTMLElement).style;
        style.transitionDuration = '0s';
        style.transform = `translate(${dx}px, ${dy}px)`;

        forceReflow();

        style.transitionDuration = style.transform = '';
        el.classList.add(prefix + 'move');
        whenTransitionEnds(el, () => {
            el.classList.remove(prefix + 'move');
        });
    });
}

function cancel(el: HTMLElement) {
    if ((el as any)._currentTransition) {
        el.classList.remove(
            ...['active', 'from', 'to'].map(c => (el as any)._currentTransition + c)
        );
        (el as any)._currentTransition = null;
    }
}

export function transition(el: HTMLElement, name: string, options: TransitionOptions = {}) {
    const prefix = getPrefix(options) + name + '-';
    const cl = el.classList;

    cancel(el);
    (el as any)._currentTransition = prefix;

    cl.add(prefix + 'active', prefix + 'from');

    nextFrame(() => {
        cl.add(prefix + 'to');
        cl.remove(prefix + 'from');

        whenTransitionEnds(el, () => {
            cl.remove(prefix + 'to', prefix + 'active');

            if ((el as any)._currentTransition === prefix) {
                options.finish && options.finish();
                (el as any)._currentTransition = null;
            }
        });
    });
}

export function hello(el: HTMLElement, options: TransitionOptions = {}) {
    transition(el, 'enter', options);
}

export function goodbye(el: HTMLElement, options: TransitionOptions = {}) {
    transition(el, 'leave', options);
}

function nextFrame(cb: () => void) {
    requestAnimationFrame(() => {
        requestAnimationFrame(cb);
    });
}

function whenTransitionEnds(el: HTMLElement, resolve: () => void) {
    if (getComputedStyle(el).transitionDuration.startsWith('0s')) {
        resolve();
    } else {
        const cb = () => {
            resolve();
            el.removeEventListener('transitionend', cb);
        };

        el.addEventListener('transitionend', cb);
    }
}

function getPrefix(options?: TransitionOptions) {
    return options.prefix ? options.prefix + '-' : '';
}
