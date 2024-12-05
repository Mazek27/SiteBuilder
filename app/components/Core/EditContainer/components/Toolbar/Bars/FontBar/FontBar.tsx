import * as React from 'react';
import { FC, useContext } from 'react';
import { EditContext } from '~/components/Layout/LayoutGuard';
import { ToolbarProps } from '~/components/Core/EditContainer/components/Toolbar/Toolbar';
import {
    GrTextAlignFull,
    GrTextAlignCenter,
    GrTextAlignRight,
    GrTextAlignLeft,
    GrGrommet,
    GrItalic,
    GrUnderline,
    GrBold,
} from 'react-icons/gr';
import _ from 'lodash';

type Props = ToolbarProps;

const FontToolbar: React.FC<Props> = ({ id }) => {
    const { handleUpdateClassName } = useContext(EditContext);

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

    const handleChange = (property: string, value: string) => {
        handleUpdateClassName(id, property, value);
    };

    return (
        <div className="flex flex-wrap items-center p-2 bg-gray-100 border-b border-gray-300">
            {/* Wybór rodziny czcionki */}
            <select
                onChange={e => handleChange('fontFamily', e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mr-2">
                {fonts.map(font => (
                    <option key={font} value={font} className={font}>
                        {font.replace('font-', '')}
                    </option>
                ))}
            </select>

            {/* Wybór rozmiaru czcionki */}
            <select
                onChange={e => handleChange('fontSize', e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mr-2">
                {fontSizes.map(size => (
                    <option key={size} value={size}>
                        {size.replace('text-', '')}
                    </option>
                ))}
            </select>

            {/* Przyciski formatowania tekstu */}
            <button
                onClick={() => handleChange('fontWeight', 'font-bold')}
                className="p-2 border border-gray-300 rounded mr-1 hover:bg-gray-200">
                <GrBold className={'w-6 h-6'} />
            </button>
            <button
                onClick={() => handleChange('fontStyle', 'italic')}
                className="p-2 border border-gray-300 rounded mr-1 hover:bg-gray-200">
                <GrItalic className={'w-6 h-6'} />
            </button>
            <button
                onClick={() => handleChange('textDecoration', 'underline')}
                className="p-2 border border-gray-300 rounded mr-2 hover:bg-gray-200">
                <GrUnderline className={'w-6 h-6'} />
            </button>

            {/* Przyciski wyrównania tekstu */}
            <button
                onClick={() => handleChange('textAlign', 'text-left')}
                className="p-2 border border-gray-300 rounded mr-1 hover:bg-gray-200">
                <GrTextAlignLeft className={'w-6 h-6'} />
            </button>
            <button
                onClick={() => handleChange('textAlign', 'text-center')}
                className="p-2 border border-gray-300 rounded mr-1 hover:bg-gray-200">
                <GrTextAlignCenter className={'w-6 h-6'} />
            </button>
            <button
                onClick={() => handleChange('textAlign', 'text-right')}
                className="p-2 border border-gray-300 rounded mr-2 hover:bg-gray-200">
                <GrTextAlignRight className={'w-6 h-6'} />
            </button>
            <button
                onClick={() => handleChange('textAlign', 'text-justify')}
                className="p-2 border border-gray-300 rounded mr-2 hover:bg-gray-200">
                <GrTextAlignFull className={'w-6 h-6'} />
            </button>
            {/* Wybór koloru tekstu */}
            <input
                type="color"
                onChange={e =>
                    handleChange('textColor', `text-[${e.target.value}]`)
                }
                className="w-10 h-10 border border-gray-300 rounded"
            />
        </div>
    );
};

export default FontToolbar;
