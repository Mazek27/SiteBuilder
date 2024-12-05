import type { CSSProperties } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import {
    arrow,
    autoUpdate,
    flip,
    limitShift,
    offset,
    shift,
    useFloating,
} from '@floating-ui/react';


const Consts = {
    maxWidth: 420,
    delay: 0,
};

export const useTooltip = (open: boolean) => {
    const arrowRef = useRef(null);
    const observerRef = useRef<MutationObserver | null>(null);


    const { floatingStyles, refs, context } = useFloating({
        placement: 'bottom',
        middleware: [
            offset(10),
            flip(),
            shift({ limiter: limitShift(), padding: 10 }),
            arrow({
                element: arrowRef,
            }),
        ],
        whileElementsMounted: autoUpdate,
        open,
    });

    const handleDismissTooltip = useCallback(
        () => {
            refs.floating.current?.classList.add('fade-out');

            setTimeout(() => {
                refs.floating.current?.classList?.remove('fade-out');
            }, 300);
        },
        [ refs]
    );

    useEffect(() => {
            refs.floating.current?.classList.add('hidden');
            setTimeout(() => {
                refs.floating.current?.classList?.remove('hidden');
            }, (Consts.delay ) * 1000);
    }, [refs]);


    const wrapperStyle = useMemo<CSSProperties>(
        () => ({
            ...floatingStyles,
            maxWidth: 500,
            zIndex: 97,
        }),
        [floatingStyles]
    );

    return {
        wrapperStyle,
        refs,
        context,
        arrowRef,
        handleDismiss: handleDismissTooltip,
    };
};
