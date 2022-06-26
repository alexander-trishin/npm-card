import cliBoxes from 'cli-boxes';
import pico from 'picocolors';

import stripAnsi from './strip-ansi';

import type { IBoxifyOptions } from './types';

const NewLine = '\n';
const Space = ' ';

const boxify = (text: string, options: IBoxifyOptions = {}) => {
    const {
        margin = 0,
        padding = 0,
        borderColor = 'white',
        borderStyle = cliBoxes.single
    } = options;

    const mx = Space.repeat(margin);
    const my = NewLine.repeat(margin);

    const px = Space.repeat(padding);
    const py = Array.from({ length: padding }, () => '');

    const lines = [...py, ...text.split(NewLine), ...py];
    const contentLength = Math.max.apply(
        Math,
        lines.map(line => stripAnsi(line).length)
    );

    const border = (side: keyof typeof borderStyle) => {
        return pico[borderColor](borderStyle[side]);
    };

    const hr = border('top').repeat(contentLength + padding * 2);
    const top = `${mx}${border('topLeft')}${hr}${border('topRight')}`;
    const bottom = `${mx}${border('bottomLeft')}${hr}${border('bottomRight')}`;

    lines.forEach((line, index) => {
        const content = line.padEnd(contentLength, Space);

        lines[index] = `${mx}${border('left')}${px}${content}${px}${border('right')}${mx}`;
    });

    const card = [top, ...lines, bottom].join(NewLine);

    return `${my}${card}${my}`;
};

export = boxify;
