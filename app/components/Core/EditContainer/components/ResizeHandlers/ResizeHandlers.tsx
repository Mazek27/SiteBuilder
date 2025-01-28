import React, {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useEditContext } from '~/hooks/useEditContext';
import { useOutsideClick } from '~/hooks/useOutsideClick';
import throttle from 'lodash/throttle';

type Direction =
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight';

type ResizeHandlerProps = {
    id: string;
    elementRef: any;
    initialWidth?: number;
    initialHeight?: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
};

export const ResizeHandlers = forwardRef<any, ResizeHandlerProps>(
    (props, ref) => {
        const {
            id,
            initialWidth = 200,
            initialHeight = 100,
            minWidth = 50,
            minHeight = 50,
            elementRef,
        } = props;

        const currentElement = elementRef.current;
        const parentElement = elementRef.current.parentElement;

        const {
            maxWidth = parentElement.offsetWidth,
            maxHeight = parentElement.offsetHeight,
        } = props;

        const startPos = useRef({ x: 0, y: 0 });

        const [isResizing, setIsResizing] = useState(false);
        const [isDragging, setIsDragging] = useState(false);
        const directionRef = useRef<Direction | null>(null);
        const [dimensions, setDimensions] = useState({
            width: currentElement.offsetWidth,
            height: currentElement.offsetHeight,
        });

        const { handleUpdateStyle } = useEditContext();

        const startResize = useCallback(
            (direction: Direction) => (e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                startPos.current = { x: e.clientX, y: e.clientY };
                setIsResizing(true);
            },
            [],
        );

        // Stop dragging
        const stopDrag = useCallback((e: MouseEvent) => {
            e.stopPropagation();
            setIsDragging(false);
        }, []);

        const handleDrag = useCallback(
            throttle((e: MouseEvent) => {
                if (!isResizing || !currentElement || !parentElement) return;

                const deltaX = e.clientX - startPos.current.x;
                const deltaY = e.clientY - startPos.current.y;

                const newX = Math.max(
                    0,
                    Math.min(
                        parentElement.offsetWidth - currentElement.offsetWidth,
                        originalPos.current.x + deltaX,
                    ),
                );
                const newY = Math.max(
                    0,
                    Math.min(
                        parentElement.offsetHeight -
                            currentElement.offsetHeight,
                        originalPos.current.y + deltaY,
                    ),
                );

                handleUpdateStyle(id, {
                    position: 'absolute',
                    left: `${newX}px`,
                    top: `${newY}px`,
                });
            }, 16),
            [isDragging, currentElement, parentElement, id],
        );

        const handleResize = useCallback(
            throttle((e: MouseEvent) => {
                if (
                    !isResizing.current ||
                    !resizeDirection ||
                    !elementRef.current
                )
                    return;

                const element = elementRef.current;
                const rect = element.getBoundingClientRect();

                let newWidth = dimensions.width;
                let newHeight = dimensions.height;

                switch (resizeDirection) {
                    case 'right':
                        newWidth = Math.max(
                            minWidth,
                            Math.min(maxWidth, e.clientX - rect.left),
                        );
                        break;
                    case 'left':
                        newWidth = Math.max(
                            minWidth,
                            Math.min(maxWidth, rect.right - e.clientX),
                        );
                        break;
                    case 'bottom':
                        newHeight = Math.max(
                            minHeight,
                            Math.min(maxHeight, e.clientY - rect.top),
                        );
                        break;
                    case 'top':
                        newHeight = Math.max(
                            minHeight,
                            Math.min(maxHeight, rect.bottom - e.clientY),
                        );
                        break;
                    case 'bottomRight':
                        newWidth = Math.max(
                            minWidth,
                            Math.min(maxWidth, e.clientX - rect.left),
                        );
                        newHeight = Math.max(
                            minHeight,
                            Math.min(maxHeight, e.clientY - rect.top),
                        );
                        break;
                    case 'bottomLeft':
                        newWidth = Math.max(
                            minWidth,
                            Math.min(maxWidth, rect.right - e.clientX),
                        );
                        newHeight = Math.max(
                            minHeight,
                            Math.min(maxHeight, e.clientY - rect.top),
                        );
                        break;
                    case 'topRight':
                        newWidth = Math.max(
                            minWidth,
                            Math.min(maxWidth, e.clientX - rect.left),
                        );
                        newHeight = Math.max(
                            minHeight,
                            Math.min(maxHeight, rect.bottom - e.clientY),
                        );
                        break;
                    case 'topLeft':
                        newWidth = Math.max(
                            minWidth,
                            Math.min(maxWidth, rect.right - e.clientX),
                        );
                        newHeight = Math.max(
                            minHeight,
                            Math.min(maxHeight, rect.bottom - e.clientY),
                        );
                        break;
                }

                setDimensions({ width: newWidth, height: newHeight });

                handleUpdateStyle(id, {
                    width: `${newWidth}px`,
                    height: `${newHeight}px`,
                });
            }, 16),
            [
                isResizing,
                dimensions,
                minWidth,
                maxWidth,
                minHeight,
                maxHeight,
                id,
            ],
        );

        const stopResize = useCallback((e: MouseEvent) => {
            e.stopPropagation();
            isResizing.current = false;
        }, []);

        useEffect(() => {
            if (isResizing.current) {
                window.addEventListener('mousemove', handleResize);
                window.addEventListener('mouseup', stopResize);
            }

            return () => {
                window.removeEventListener('mousemove', handleResize);
                window.removeEventListener('mouseup', stopResize);
            };
        }, [isResizing, handleResize, stopResize]);

        // useOutsideClick(elementRef, stopResize);
        const handlersClass = 'absolute bg-blue-400';

        return (
            <>
                <div
                    className={`${handlersClass} -top-4 -left-4 w-4 h-4 cursor-nw-resize`}
                    onMouseDown={startResize('topLeft')}
                />
                <div
                    className={`${handlersClass} -top-4 -right-4 w-4 h-4 cursor-ne-resize`}
                    onMouseDown={startResize('topRight')}
                />
                <div
                    className={`${handlersClass} -bottom-4 -left-4 w-4 h-4 cursor-sw-resize`}
                    onMouseDown={startResize('bottomLeft')}
                />
                <div
                    className={`${handlersClass} -bottom-4 -right-4 w-4 h-4 cursor-se-resize`}
                    onMouseDown={startResize('bottomRight')}
                />
                <div
                    className={`${handlersClass} -right-4 top-1 bottom-1 w-4 cursor-ew-resize`}
                    onMouseDown={startResize('right')}
                />
                <div
                    className={`${handlersClass} -left-4 top-1 bottom-1 w-4 cursor-ew-resize`}
                    onMouseDown={startResize('left')}
                />
                <div
                    className={`${handlersClass} -top-4 left-1 right-1 h-4 cursor-ns-resize`}
                    onMouseDown={startResize('top')}
                />
                <div
                    className={`${handlersClass} -bottom-4 left-1 right-1 h-4 cursor-ns-resize`}
                    onMouseDown={startResize('bottom')}
                />
                {/*<div className="absolute -top-2 -left-2 w-4 h-4 bg-red-400"/>*/}
                {/*<div className="absolute -top-2 -right-2 w-4 h-4 bg-red-400"/>*/}
                {/*<div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-400"/>*/}
                {/*<div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-400"/>*/}
            </>
        );
    },
);
