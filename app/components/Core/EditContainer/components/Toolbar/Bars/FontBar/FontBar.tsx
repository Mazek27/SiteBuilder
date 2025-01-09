import * as React from 'react';
import {
    GrTextAlignCenter,
    GrTextAlignRight,
    GrTextAlignLeft,
    GrGrommet,
    GrItalic,
    GrUnderline,
    GrBold,
} from 'react-icons/gr';
import _ from 'lodash';
import { BarButton } from '~/components/Core/EditContainer/components/Toolbar/components/BarButton';
import { ComponentToolbar } from '~/components/Core/EditContainer/components/Toolbar/Toolbar';
import { CoreToolbar } from '~/components/Core/EditContainer/components/Toolbar/components/CoreToolbar';
import { useEditContext } from '~/hooks/useEditContext';

type Props = ComponentToolbar<{}>;

const FontToolbar: React.FC<Props> = ({ id, type, ...methods }) => {
    const { handleUpdateClassName, getComponentClassNames } = useEditContext();

    const activeClassNames = getComponentClassNames(id);

    console.log(activeClassNames);

    const fonts = ['font-sans', 'font-serif', 'font-mono'];
    const sizes = _.fill(Array(6), null).map((_, i) => i + 1);
    let fontSizes = [
        'text-xs',
        'text-sm',
        'text-base',
        'text-lg',
        'text-{{size}}xl',
    ];

    fontSizes = fontSizes
        .map(size => {
            if (size.includes('{{size}}')) {
                return sizes.map(s => size.replace('{{size}}', s.toString()));
            }
            return size;
        })
        .flatMap(s => s);

    const handleChange = (data: { [key: string]: string }) => {
        handleUpdateClassName(id, data, false);
    };

    return (
        <CoreToolbar id={id} type={type} {...methods}>
            {/* Wybór rodziny czcionki */}
            <select
                onChange={e => handleChange({ fontFamily: e.target.value })}
                defaultValue={activeClassNames.fontFamily}
                className="border border-gray-300 rounded px-2 py-1">
                {fonts.map(font => (
                    <option key={font} value={font} className={font}>
                        {font.replace('font-', '')}
                    </option>
                ))}
            </select>

            {/* Wybór rozmiaru czcionki */}
            <select
                onChange={e => handleChange({ fontSize: e.target.value })}
                defaultValue={activeClassNames.fontSize}
                className="border border-gray-300 rounded px-2 py-1">
                {fontSizes.map(size => (
                    <option key={size} value={size}>
                        {size.replace('text-', '')}
                    </option>
                ))}
            </select>

            {/* Przyciski formatowania tekstu */}
            <BarButton
                active={activeClassNames.fontWeight === 'font-bold'}
                onClick={() => handleChange({ fontWeight: 'font-bold' })}
                icon={GrBold}
            />
            <BarButton
                active={activeClassNames.fontStyle === 'italic'}
                onClick={() => handleChange({ fontStyle: 'italic' })}
                icon={GrItalic}></BarButton>
            <BarButton
                active={activeClassNames.textDecoration === 'underline'}
                onClick={() => handleChange({ textDecoration: 'underline' })}
                icon={GrUnderline}></BarButton>

            {/* Przyciski wyrównania tekstu */}
            <BarButton
                active={activeClassNames.textAlign === 'text-left'}
                onClick={() => handleChange({ textAlign: 'text-left' })}
                icon={GrTextAlignLeft}></BarButton>
            <BarButton
                active={activeClassNames.textAlign === 'text-center'}
                onClick={() => handleChange({ textAlign: 'text-center' })}
                icon={GrTextAlignCenter}></BarButton>
            <BarButton
                active={activeClassNames.textAlign === 'text-right'}
                onClick={() => handleChange({ textAlign: 'text-right' })}
                icon={GrTextAlignRight}></BarButton>
            <BarButton
                active={activeClassNames.textAlign === 'text-justify'}
                onClick={() => handleChange({ textAlign: 'text-justify' })}
                icon={GrGrommet}></BarButton>
            {/* Wybór koloru tekstu */}
            <input
                type="color"
                onChange={e =>
                    handleChange({ textColor: `text-[${e.target.value}]` })
                }
                className="w-10 h-10 border border-gray-300 rounded"
            />
        </CoreToolbar>
    );
};

export default FontToolbar;
