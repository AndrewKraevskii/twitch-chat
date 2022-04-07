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
	DisablePadding = 'disablePadding'
}

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
};
