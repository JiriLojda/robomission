const doNothing = () => { /* do nothing*/
};

export interface ICancelablePromise<T = void> extends Promise<T> {
    then: <TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null) =>
        ICancelablePromise<TResult1 | TResult2>;
    cancel: () => void;
}

export class CancelledDelay {
}

type PromiseCallback<T = unknown> = ((value: T) => T) | null | undefined;

function cancelable<T>(thePromise: Promise<T>, timeout: number, rejectCallback: (reason: unknown) => unknown): ICancelablePromise<T> {
    const originalThen = thePromise.then;

    return Object.assign(thePromise, {
        cancel() {
            clearTimeout(timeout);
            rejectCallback(new CancelledDelay());
        },
        then(success: PromiseCallback<T>, fail: PromiseCallback<any>) {
            return cancelable(originalThen.call(thePromise, success, fail), timeout, rejectCallback);
        },
    });
}

export function delay(duration: number): ICancelablePromise<void> {
    let timeout: any = -1;
    let rejectCallback = doNothing;
    const thePromise = new Promise<void>((resolve, reject) => {
        rejectCallback = reject;
        // We can't use window.setTimeout here, because that doesn't work in tests
        timeout = setTimeout(resolve, duration);
    });

    return cancelable(thePromise, timeout, rejectCallback);
}
