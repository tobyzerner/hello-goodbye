# Hello Goodbye

Tiny library to apply **enter**, **leave**, and **move** transitions to DOM elements. Inspired by Vue's [`<transition>`](https://vuejs.org/guide/built-ins/transition.html) and [`<transition-group>`](https://vuejs.org/guide/built-ins/transition-group.html) components, but in plain DOM.

![Size](https://img.shields.io/bundlephobia/minzip/hello-goodbye)

[**Demo**](https://tobyzerner.github.io/hello-goodbye/index.html)

## Installation

```sh
npm install hello-goodbye --save
```

## Usage

### `hello`

Apply an **enter** transition to a newly-added element.

```ts
import { hello } from 'hello-goodbye';

parent.appendChild(el);
hello(el);
```

```css
.enter-active { transition: transform .5s }
.enter-from { transform: translateY(100%) }
```

### `goodbye`

Apply a **leave** transition to an element and remove it when finished.

```ts
import { goodbye } from 'hello-goodbye';

goodbye(el, {
    finish: () => parent.removeChild(el)
});
```

```css
.leave-active { transition: opacity .5s }
.leave-to { opacity: 0 }
```

### `move`

Smoothly move elements into their new positions.

```ts
import { move } from 'hello-goodbye';

move(parent.children, () => {
    // Shuffle the children
    for (let i = parent.children.length; i >= 0; i--) {
        parent.appendChild(parent.children[Math.random() * i | 0]);
    }
});
```

```css
.move { transition: transform .5s }
```

### `transition`

Run a named transition on an element. Used under the hood by `hello` and `goodbye`.

1. The `${name}-active` and `${name}-from` classes are added
2. Next frame: the `${name}-from` class is removed, and the `${name}-to` class is added
3. When the transition ends: all classes are removed and the `finish` callback is called

```ts
import { transition } from 'hello-goodbye';

transition(
    el: HTMLElement,
    name: string,
    options?: TransitionOptions
);

type TransitionOptions = {
    finish?: Function, // called when the transition ends
    prefix?: string // optional prefix for animation class names
};
```

### `cancel`

Cancel any currently-running transition on an element.

```ts
import { cancel } from 'hello-goodbye';

cancel(el: HTMLElement);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)
