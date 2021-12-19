import { useEffect } from "react";

export function useMutations(ref: any, handler: (element: HTMLElement) => void) {
    useEffect(() => {
        const observer = new MutationObserver((e: any) => {
            const node: HTMLElement = e[0].target.parentNode;
            handler(node);
        });

        observer.observe(ref.current, {
            subtree: true,
            characterData: true,
        });

        return () => {
            observer.disconnect();
        };
    }, [ref, handler]);
}
