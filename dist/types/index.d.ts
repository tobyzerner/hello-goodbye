type TransitionOptions = {
    prefix?: string;
};
export declare function move(elements: HTMLCollection | HTMLElement[], cb: Function, options?: TransitionOptions): void;
export declare function cancel(el: HTMLElement): void;
export declare function transition(el: HTMLElement, name: string, options?: TransitionOptions): Promise<void>;
export declare function hello(el: HTMLElement, options?: TransitionOptions): Promise<void>;
export declare function goodbye(el: HTMLElement, options?: TransitionOptions): Promise<void>;
export {};
