import React, { useEffect, useRef } from 'react';
import { Suggest } from "../../entities/EditResultDto";
import './SuggestsPopup.css';

interface Position {
    top: number;
    left: number;
}

interface SuggestsPopupProps {
    suggests: Suggest[];
    onClickOutside: () => void;
    onSuggestClick: (suggest: Suggest) => void;
    position: Position;
}

export function SuggestsPopup (
    { suggests, onClickOutside, onSuggestClick, position }: SuggestsPopupProps,
): JSX.Element {
    const suggestRef = useRef(null);
    useOnClickOutside(suggestRef, onClickOutside);

    return (
        <div 
            className="suggests-container" 
            ref={suggestRef} 
            style={{ top: position.top, left: position.left }}
        >
            {suggests.map((s) => (
                <div 
                    className="suggest" 
                    key={s.value}
                    onClick={() => onSuggestClick(s)}
                >
                    {s.title}
                </div>
            ))}
        </div>
    );
}

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
            return;
        }
        handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
