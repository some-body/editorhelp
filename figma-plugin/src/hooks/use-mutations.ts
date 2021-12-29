import { useEffect } from "react";

export function useMutations(
    ref: any, 
    handler: (element: HTMLElement) => void, 
    deps: any[],
): () => void {

    const observer = new MutationObserver((e: any) => {
        e.forEach(event => {
            const node: HTMLElement = event.target.parentNode;
            handler(node);
        });
    });

    useEffect(() => {
        observer.observe(ref.current, {
            subtree: true,
            characterData: true,
            childList: true,
            // с childList осторожней:
            // когда вкл: может быть кейс, что не переключается текст при переключении нод
            // когда выкл: может быть кейс, что если в начале слова с ошибкой новые строки добавлять, ошибка может разъезжаться на несколько строк
        });

        return () => {
            observer.disconnect();
        };
    }, [ref, handler, ...deps]);

    return () => {
        observer.disconnect();
    };
}
