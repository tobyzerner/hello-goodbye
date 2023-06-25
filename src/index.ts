type TransitionOptions = {
    prefix?: string;
};

export function move(
    elements: HTMLCollection | HTMLElement[],
    cb: Function,
    options: TransitionOptions = {}
) {
    const rects = new WeakMap<Element, DOMRect>();
    const prefix = getPrefix(options);

    if (elements instanceof HTMLCollection) {
        elements = Array.from(elements) as HTMLElement[];
    }

    elements.forEach((el) => {
        if (getComputedStyle(el).display !== 'none') {
            rects.set(el, el.getBoundingClientRect());
        }
    });

    cb();

    elements.forEach((el) => {
        const rect = rects.get(el);
        if (!rect) return;

        const dx = rect.left - el.getBoundingClientRect().left;
        const dy = rect.top - el.getBoundingClientRect().top;
        if (!dx && !dy) return;

        const style = (el as HTMLElement).style;
        style.transitionDuration = '0s';
        style.transform = `translate(${dx}px, ${dy}px)`;

        requestAnimationFrame(async () => {
            el.classList.add(prefix + 'move');
            style.transitionDuration = style.transform = '';
            await transitionEnd(el);
            el.classList.remove(prefix + 'move');
        });
    });
}

export function cancel(el: HTMLElement) {
    if ((el as any)._currentTransition) {
        el.classList.remove(
            ...['active', 'from', 'to'].map(
                (c) => (el as any)._currentTransition + c
            )
        );
        (el as any)._currentTransition = null;
    }
}

export async function transition(
    el: HTMLElement,
    name: string,
    options: TransitionOptions = {}
) {
    const prefix = getPrefix(options) + name + '-';
    const cl = el.classList;

    cancel(el);
    (el as any)._currentTransition = prefix;

    cl.add(prefix + 'active', prefix + 'from');

    await nextFrame();

    cl.add(prefix + 'to');
    cl.remove(prefix + 'from');

    await transitionEnd(el);

    cl.remove(prefix + 'to', prefix + 'active');

    if ((el as any)._currentTransition === prefix) {
        (el as any)._currentTransition = null;
    }
}

export function hello(el: HTMLElement, options: TransitionOptions = {}) {
    return transition(el, 'enter', options);
}

export function goodbye(el: HTMLElement, options: TransitionOptions = {}) {
    return transition(el, 'leave', options);
}

function nextFrame() {
    return new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    );
}

async function transitionEnd(el: HTMLElement) {
    if (getComputedStyle(el).transitionDuration.startsWith('0s')) return;
    let started = false;
    const onStart = () => (started = true);
    el.addEventListener('transitionstart', onStart);
    await nextFrame();
    el.removeEventListener('transitionstart', onStart);
    if (!started) return;
    return new Promise<void>((resolve) => {
        const onEnd = () => {
            resolve();
            el.removeEventListener('transitionend', onEnd);
            el.removeEventListener('transitioncancel', onEnd);
        };
        el.addEventListener('transitionend', onEnd);
        el.addEventListener('transitioncancel', onEnd);
    });
}

function getPrefix(options?: TransitionOptions) {
    return options?.prefix ? options.prefix + '-' : '';
}
