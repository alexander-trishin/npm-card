import type { Colors } from 'picocolors/types';
import type { BoxStyle } from 'cli-boxes';

interface IInfo {
    name: string;
    nickname: string;
    work: string;
    npm: string;
    github: string;
    linkedin: string;
    web: string;
    package: string;
}

interface ILayoutItem {
    label: string;
    text: string;
}

export interface ICard {
    info: IInfo;
    layout: Array<ILayoutItem | string>;
}

export interface IBoxifyOptions {
    margin?: number;
    padding?: number;
    borderColor?: keyof Omit<Colors, 'isColorSupported'>;
    borderStyle?: BoxStyle;
}
