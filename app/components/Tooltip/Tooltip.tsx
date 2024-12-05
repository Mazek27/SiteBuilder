import React, { PropsWithChildren, useEffect } from 'react';

import { FloatingArrow } from '@floating-ui/react';
import {
    ButtonWrapper,
    Content,
    Title,
    TooltipWrapper,
} from '~/components/Tooltip/Tooltip.styles';
import { useTooltip } from '~/components/Tooltip/Tooltip.hooks';
import { Button } from '~/components/Core/Button/Button';
import { useOutsideClick } from '~/hooks/useOutsideClick';

type TooltipProps = {
    open: boolean;
    attachRef: React.RefObject<HTMLElement>;
    close: () => void;
};

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
    attachRef,
    open,
    close,
    children,
}) => {
    const tooltipRef = React.useRef<any>(null);
    const { refs, context, wrapperStyle, arrowRef, handleDismiss } =
        useTooltip(open);

    useEffect(() => {
        refs.setReference(attachRef.current);
    }, []);

    useOutsideClick(tooltipRef, close);

    return (
        <TooltipWrapper
            ref={ref => {
                tooltipRef.current = ref;
                refs.setFloating(ref);
            }}
            style={wrapperStyle}>
            <FloatingArrow
                ref={arrowRef}
                context={context}
                fill="#464646"
                tipRadius={2}
                strokeWidth={3}
                stroke="#ffffff5c"
            />
            <>
                <Content className={'p-5 bg-gray-950'}>{children}</Content>
                <ButtonWrapper className={''}>
                    <Button editable={false} type={'submit'} text={'save'} />
                </ButtonWrapper>
            </>
        </TooltipWrapper>
    );
};

export default Tooltip;
