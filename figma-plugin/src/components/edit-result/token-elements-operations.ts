import { ERROR_CLASS, ERROR_DATA_ATTR } from "../token/TokenComponent";

const HOVERED_CLASS = 'hovered';

export function removeErrorForAllParents(root: HTMLElement, node: HTMLElement) {
    if (!node || node === root || root.parentElement === node) {
        return;
    }

    node.classList.remove(ERROR_CLASS);
    node.removeAttribute(ERROR_DATA_ATTR);
    node.style.backgroundColor = '';

    removeErrorForAllParents(root, node.parentElement);
}

export function getNearestParentError (root: HTMLElement, node: HTMLElement): HTMLElement | undefined {
    if (node === root) {
        return undefined;
    }

    if (node.classList.contains(ERROR_CLASS) && node.hasAttribute(ERROR_DATA_ATTR)) {
        return node;
    }

    return getNearestParentError(root, node.parentElement);
}

export function addHoverToNearestError (root: HTMLElement, node: HTMLElement) {
    const errNode = getNearestParentError(root, node);
    if (errNode) {
        errNode.classList.add(HOVERED_CLASS);
    }
}

export function removeHoverClasses (root: HTMLElement) {
    root.querySelectorAll(`.${HOVERED_CLASS}`)
        .forEach((el) => el.classList.remove(HOVERED_CLASS));
}
