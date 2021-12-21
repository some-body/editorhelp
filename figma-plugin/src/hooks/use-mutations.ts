import { useEffect } from "react";

export function useMutations(ref: any, handler: (element: HTMLElement) => void, deps: any[]) {
    useEffect(() => {
        const observer = new MutationObserver((e: any) => {
            e.forEach(event => {
                const node: HTMLElement = event.target.parentNode;
                handler(node);
            });
        });

        observer.observe(ref.current, {
            subtree: true,
            characterData: true,
            // childList: true,
        });

        return () => {
            observer.disconnect();
        };
    }, [ref, handler, ...deps]);
}
