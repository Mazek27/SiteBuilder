import type { RefObject } from 'react';
import { useEffect } from 'react';

const InteractionStartEvent = {
    mouse: 'mousedown',
    touch: 'touchstart',
    pointer: 'pointerdown',
};

// NOTE: not used, left fo future reference
export function useOutsideClick<T extends HTMLElement | SVGElement>(
    ref: RefObject<T>,
    callback: () => void,
): void {
    useEffect(() => {
        function handleClickOutside(event: Event) {
            const { target } = event;
            const anchorEl = ref.current;

            if (
                ref.current &&
                anchorEl !== target &&
                !ref.current.contains(target as Node)
            ) {
                callback();
            }
        }

        let uiStartEvent = InteractionStartEvent.mouse;
        // if (Capabilities.shared.isMobileDevice) {
        //     uiStartEvent = hasTouchEvent()
        //         ? InteractionStartEvent.touch
        //         : InteractionStartEvent.pointer;
        // }

        // Bind the event listener
        document.addEventListener(uiStartEvent, handleClickOutside, true);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener(
                uiStartEvent,
                handleClickOutside,
                true,
            );
        };
    }, [ref, callback]);
}

const hasTouchEvent = () => {
    return 'ontouchstart' in window;
};

const hasPointerEvent = () => {
    return window.PointerEvent;
};

// const Capabilities = {
//     shared: {
//         isMobileDevice: hasTouchEvent() || hasPointerEvent(),
//     },
// };
