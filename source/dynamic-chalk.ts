import { createColorize } from 'colorize-template';
import pico from 'picocolors';

const colorize = createColorize(pico);

function dynamicChalk(parts: any, ...substitutions: any) {
    const rawResults = [];
    const cookedResults = [];

    const partsLength = parts.length;
    const substitutionsLength = substitutions.length;

    for (let i = 0; i < partsLength; i++) {
        rawResults.push(parts.raw[i]);
        cookedResults.push(parts[i]);

        if (i < substitutionsLength) {
            rawResults.push(substitutions[i]);
            cookedResults.push(substitutions[i]);
        }
    }

    const chalkParts: any = [cookedResults.join('')];
    chalkParts.raw = [rawResults.join('')];

    return colorize(chalkParts);
}

export = dynamicChalk;
