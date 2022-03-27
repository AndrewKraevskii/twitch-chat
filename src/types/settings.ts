import type { UserNicknameColor } from './nickname';

export enum SettingName {
	HiddenNicknames = 'hidden',
	DefaultColor = 'defaultColor',
	CustomNicknameColors = 'custom',
	Font = 'font'
}

export type Settings = {
	channel: string;
	hiddenNicknames: string[];
	defaultColor: string;
	nicknameColors: UserNicknameColor;
	font: string;
};
