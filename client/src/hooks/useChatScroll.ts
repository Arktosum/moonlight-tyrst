// src/hooks/useChatScroll.ts
import { useRef, useEffect, } from 'react';

export function useChatScroll<T>(dep: T) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (el) {
            const last = el.lastElementChild as HTMLElement;
            (last ?? el).scrollIntoView({ behavior: 'smooth' });
        }
    }, [dep]);

    return ref;
}
