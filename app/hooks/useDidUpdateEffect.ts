import { useEffect, useRef } from 'react';

export const useDidUpdateEffect: typeof useEffect = (effect, deps) => {
    const isMountingRef = useRef(false);

    useEffect(() => {
        isMountingRef.current = true;
    }, []);

    useEffect(() => {
        if (!isMountingRef.current) {
            effect();
        }
        isMountingRef.current = false;
    }, deps);
};
