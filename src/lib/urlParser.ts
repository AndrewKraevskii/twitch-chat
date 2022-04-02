import { Animation, AnimationEasing, type AnimationParams } from '$types/animation';
import type { UserNicknameColor } from '$types/nickname';
import { SettingName, type Settings } from '$types/settings';
import { isColor } from './config';

class UrlParser {
	private url: URL;

	constructor(url: URL | string) {
		if (typeof url === 'string') {
			this.url = new URL(url);
		} else {
			this.url = url;
		}
	}

	public getChannel(): string {
		return this.url.pathname.replace('/', '');
	}

	public getHiddenNicknames(): string[] {
		const hidden = this.url.searchParams.get(SettingName.HiddenNicknames);
		if (!hidden) return [];
		return hidden.split(',');
	}

	public getDefaultColor(): string {
		const defaultColor = this.url.searchParams.get(SettingName.DefaultColor);
		if (!defaultColor) return '';
		return '#' + defaultColor;
	}

	public getNicknameColors(): UserNicknameColor {
		let colors: UserNicknameColor = {};
		const custom = this.url.searchParams.get(SettingName.CustomNicknameColors);

		if (!custom) return colors;

		custom.split(',').forEach((nicknameWithColors) => {
			const [nickname, start, end] = nicknameWithColors.split(':');
			if (!end) {
				if (!isColor('#' + start)) return;
				colors = {
					...colors,
					[nickname]: '#' + start
				};
			} else {
				if (!isColor('#' + start) || !isColor('#' + end)) return;
				colors = {
					...colors,
					[nickname]: {
						start: '#' + start,
						end: '#' + end
					}
				};
			}
		});

		return colors;
	}

	public getFont(): string {
		const font = this.url.searchParams.get(SettingName.Font);
		if (!font) return '';
		return font;
	}

	public getAnimation(): Animation {
		const animation: string = this.url.searchParams.get(SettingName.Animation);
		if (Object.values(Animation).includes(animation as Animation)) {
			return animation as Animation;
		}
		return Animation.Slide;
	}

	public getAnimationEasing(): AnimationEasing {
		const animationEasing: string = this.url.searchParams.get(SettingName.AnimationEasing);
		if (Object.values(AnimationEasing).includes(animationEasing as AnimationEasing)) {
			return animationEasing as AnimationEasing;
		}
		return AnimationEasing.Linear;
	}

	public getAnimationParams(): AnimationParams {
		let params: AnimationParams = {};
		const animationParams: string = this.url.searchParams.get(SettingName.AnimationParams);
		if (!animationParams) return params;

		animationParams.split(',').forEach((param) => {
			const [key, value] = param.split(':');
			try {
				const numberValue = Number(value);
				if (Number.isNaN(numberValue)) throw new Error(key + ' is NaN');
				params = {
					[key]: numberValue
				};
			} catch (e) {
				console.error(e);
			}
		});

		return params;
	}

	public getHideReward(): boolean {
		const hideReward = this.url.searchParams.get(SettingName.HideReward);
		return !!hideReward;
	}

	public getSettings(): Settings {
		return {
			channel: this.getChannel(),
			hiddenNicknames: this.getHiddenNicknames(),
			defaultColor: this.getDefaultColor(),
			nicknameColors: this.getNicknameColors(),
			font: this.getFont(),
			animation: this.getAnimation(),
			animationEasing: this.getAnimationEasing(),
			animationParams: this.getAnimationParams(),
			hideReward: this.getHideReward()
		};
	}
}

export default UrlParser;
