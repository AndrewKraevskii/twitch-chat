import type { UserNicknameColor } from './nickname';

export enum SettingName {
	HiddenNicknames = 'hidden',
	DefaultColor = 'defaultColor',
	CustomNicknameColors = 'custom'
}

export type Settings = {
	channel: string;
	hiddenNicknames: string[];
	defaultColor: string;
	nicknameColors: UserNicknameColor;
};
