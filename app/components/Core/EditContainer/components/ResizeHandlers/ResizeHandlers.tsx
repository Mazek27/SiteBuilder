import * as React from 'react';
import { FC, useCallback, useRef, useState } from 'react';
import { useEditContext } from '~/hooks/useEditContext';
import { id } from 'postcss-selector-parser';

type Props = {
    id: string;
    elementRef: React.RefObject<HTMLDivElement>;
};
const MIN_GRID = 1;
const MAX_GRID = 13;
const DEFAULT_GRID = 4;

type ResizeDirection =
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight';

export const ResizeHandlers: FC<Props> = ({ id, elementRef }) => {
    const {} = useEditContext();

    const { getComponentClassNames, handleUpdateClassName } = useEditContext();
    const resizingRef = useRef<boolean>(false);
    const startPosRef = useRef({ x: 0, y: 0 });
    const currentGridRef = useRef(DEFAULT_GRID);

    const getCurrentGridSize = useCallback(() => {
        const classes = getComponentClassNames(id);
        // Check both grid-cols and col-end classes
        const gridColsClass = Object.entries(classes).find(([key]) =>
            key.startsWith('grid-cols-'),
        )?.[1];
        const colEndClass = Object.entries(classes).find(([key]) =>
            key.startsWith('col-end-'),
        )?.[1];

        if (colEndClass) {
            return parseInt(colEndClass.replace('col-end-', '')) - 1;
        }
        if (gridColsClass) {
            return parseInt(gridColsClass.replace('grid-cols-', ''));
        }
        return DEFAULT_GRID;
    }, [getComponentClassNames, id]);

    const handleResizeStart = useCallback(
        (e: React.MouseEvent, direction: ResizeDirection) => {
            e.preventDefault();
            resizingRef.current = true;
            startPosRef.current = { x: e.clientX, y: e.clientY };
            currentGridRef.current = getCurrentGridSize();

            const handleResizeMove = (e: MouseEvent) => {
                if (!resizingRef.current) return;

                const currentElement = elementRef.current;
                const parentElement = currentElement?.parentElement;

                if (!parentElement || !currentElement) return;

                const containerWidth = parentElement.offsetWidth;
                const columnWidth = containerWidth / MAX_GRID;
                const deltaX = e.clientX - startPosRef.current.x;

                // Calculate grid columns change based on direction
                let deltaColumns = Math.round(deltaX / columnWidth);
                if (direction.includes('left')) {
                    deltaColumns = -deltaColumns;
                }

                // Calculate new grid size within bounds
                const newGridSize = Math.max(
                    MIN_GRID,
                    Math.min(MAX_GRID, currentGridRef.current + deltaColumns),
                );

                // Update grid classes
                if (direction.includes('left') || direction.includes('right')) {
                    handleUpdateClassName(
                        id,
                        {
                            gridColStart: 'col-start-1',
                            gridColEnd: `col-end-${newGridSize + 1}`,
                        },
                        true,
                    );
                }
            };

            const handleResizeEnd = () => {
                resizingRef.current = false;
                document.removeEventListener('mousemove', handleResizeMove);
                document.removeEventListener('mouseup', handleResizeEnd);
            };

            document.addEventListener('mousemove', handleResizeMove);
            document.addEventListener('mouseup', handleResizeEnd);
        },
        [elementRef, getCurrentGridSize, handleUpdateClassName, id],
    );

    return (
        <>
            <div className="absolute top-0 left-0 h-100 w-100 border border-solid border-red-500 " />
            <div className="absolute -top-3 -left-3 w-4 h-4 bg-transparent cursor-nwse-resize" />
            <div className="absolute -top-3 -right-3 w-4 h-4 bg-transparent cursor-nesw-resize" />
            <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-transparent cursor-nesw-resize" />
            <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-transparent cursor-nwse-resize" />
            <div
                className="absolute top-1/2 -right-5 w-4 h-4 bg-red-500 cursor-ew-resize"
                onMouseDown={e => handleResizeStart(e, 'right')}
            />
            {/*<div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500"/>*/}
            {/*<div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500"/>*/}
            {/*<div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-500"/>*/}
            {/*<div className="absolute -bottom-2 -right-2 w-4 h-4 bg-red-500"/>*/}
        </>
    );
};
