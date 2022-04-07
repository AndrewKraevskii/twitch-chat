import type { Animation, AnimationEasing, AnimationParams } from './animation';
import type { UserNicknameColor } from './nickname';

export enum SettingName {
	HiddenNicknames = 'hidden',
	DefaultColor = 'defaultColor',
	CustomNicknameColors = 'custom',
	Font = 'font',
	Animation = 'animation',
	AnimationEasing = 'animationEasing',
	AnimationParams = 'animationParams',
	HideReward = 'hideReward',
	DisablePadding = 'disablePadding',
	FontSize = 'fontSize',
	GradientOnlyCustom = 'gradientOnly',
	ChatType = 'chatType'
}

export type ChatType = 'default' | 'block' | 'blockWithHead';

export type Settings = {
	channel: string;
	hiddenNicknames: string[];
	defaultColor: string;
	nicknameColors: UserNicknameColor;
	font: string;
	animation: Animation;
	animationEasing: AnimationEasing;
	animationParams: AnimationParams;
	hideReward: boolean;
	disablePadding: boolean;
	fontSize: number;
	gradientOnlyCustom: boolean;
	chatType: ChatType;
};
