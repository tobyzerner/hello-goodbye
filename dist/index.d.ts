declare type AnimationOptions = {
    finish?: Function;
    classPrefix?: string;
};
export declare function move(elements: HTMLCollection | Element[], cb: Function, options?: AnimationOptions): void;
export declare function animate(el: HTMLElement, name: string, options?: AnimationOptions): void;
export declare function hello(el: HTMLElement, options?: AnimationOptions): void;
export declare function goodbye(el: HTMLElement, options?: AnimationOptions): void;
export {};
