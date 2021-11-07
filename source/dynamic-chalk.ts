import chalk = require('chalk');

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

    return chalk(chalkParts);
}

export = dynamicChalk;
