import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import throttle from 'lodash.throttle';

import { onResize } from '@desktop/views/editor/Resize';
import type { IRectangle } from '@printu/geom';
import { ViewportActionCreators } from '@printu/viewport';

import { getElementFrame } from 'app/utils/DOM';
import { noop } from 'app/utils/function';

export function useElementResize(
    ref: Element | React.RefObject<Element>,
    handler: (element: Element, bounds: IRectangle) => void,
    throttleDelay = 500
) {
    React.useEffect(() => {
        const element = ref instanceof Element ? ref : ref.current;
        if (!element) {
            return noop;
        }

        const updateContainerDimensions = () => {
            const bounds = getElementFrame(element).toObject();
            handler(element, bounds);
        };

        const onWindowResize = throttle(() => {
            updateContainerDimensions();
        }, throttleDelay);

        window.addEventListener('resize', onWindowResize);
        const unobserveResize = onResize(element, onWindowResize);

        const dispose = () => {
            unobserveResize();
            window.removeEventListener('resize', onWindowResize);
        };

        return () => {
            dispose();
        };
    }, [ref, throttleDelay, handler]);
}

export function useResize(
    ref: Element | React.RefObject<Element>,
    throttleDelay = 500
) {
    const dispatch = useDispatch();

    const updateContainerDimensions = useCallback(
        (_: Element, bounds: IRectangle) => {
            dispatch(ViewportActionCreators.setCanvasRect(bounds));
        },
        [dispatch]
    );

    return useElementResize(ref, updateContainerDimensions, throttleDelay);
}
