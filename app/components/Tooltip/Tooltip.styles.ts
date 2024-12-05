import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const flashKeyframes = keyframes`
    0% {
        background-position-x:100%;
    }
    40% {
        background-position-x:0;
    }
`;

export const TooltipWrapper = styled.div<{
    flash?: number;
}>(
    ({ flash }) => css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        white-space: nowrap;
        background-color: #464646;
        padding: 15px;
        color: #fff;
        font-family: Roboto;
        border-radius: 4px;
        z-index: 97;
        box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.24);
        position: relative;

        animation: ${fadeIn} 0.2s ease-in-out;

        &.fade-out {
            animation: ${fadeOut} 0.35s ease-in-out;
        }

        &.hidden {
            display: none;
        }

        @media (max-width: 767px) and (orientation: portrait) {
            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.36);
        }

        @media (min-width: 768px) {
            svg {
                path {
                    stroke-width: 0;
                }
            }
        }

        ${flash &&
        css`
            &.flash::after {
                content: '';
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                position: absolute;
                border-radius: 4px;
                background-image: linear-gradient(
                    90deg,
                    rgba(0, 0, 0, 0) 40%,
                    rgba(255, 255, 255, 0.2),
                    rgba(0, 0, 0, 0) 60%
                );
                background-size: 300%;
                animation: ${flashKeyframes} 2.5s ease 1s ${flash} normal none
                    running;
            }
        `}
    `,
);

export const Content = styled.div`
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    text-wrap: balance;

    padding: 25px;
`;

export const Title = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: -5px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;

    .p-btn {
        font-family: 'Roboto';
        font-size: 16px;
        font-weight: 500;
        border: 1px solid rgba(255, 255, 255, 0.22);
        color: #fff;
        z-index: 2;
    }
`;
