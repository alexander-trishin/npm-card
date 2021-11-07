import cliBoxes from 'cli-boxes';

import boxify = require('./boxify');
import dynamicChalk = require('./dynamic-chalk');
import stripAnsi = require('./strip-ansi');

import type { ICard } from './types';

const NewLine = '\n';
const Space = ' ';

const replace = (template: string, map: any) => {
    return template.replace(/{{\w+}}/gi, matched => map[matched.substring(2, matched.length - 2)]);
};

const createCard = (data: ICard) => {
    const layout = data.layout.map(row => {
        if (typeof row === 'string') {
            const label = '';
            const text = dynamicChalk`${replace(row, data.info)}`;

            return {
                label,
                text,
                rawLabel: label,
                rawText: stripAnsi(text)
            };
        }

        const label = dynamicChalk`{bold ${replace(row.label, data.info)}}{white : }`;
        const text = dynamicChalk`${replace(row.text, data.info)}`;

        return {
            label,
            text,
            rawLabel: stripAnsi(label),
            rawText: stripAnsi(text)
        };
    });

    const labelText = Math.max.apply(
        Math,
        layout.map(row => row.rawLabel.length)
    );

    const textLength = Math.max.apply(
        Math,
        layout.map(row => row.rawText.length)
    );

    const text = layout
        .map(row => {
            const px = 3;

            const label = row.label.padStart(
                labelText - row.rawLabel.length + row.label.length + px,
                Space
            );
            const text = row.text.padEnd(
                textLength - row.rawText.length + row.text.length + px,
                Space
            );

            return `${label}${text}`;
        })
        .join(NewLine);

    return boxify(text, {
        margin: 1,
        padding: 1,
        borderColor: 'green',
        borderStyle: cliBoxes.round
    });
};

export = createCard;
