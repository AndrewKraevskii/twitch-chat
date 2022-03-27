import type { UserNicknameColor } from '$types/nickname';
import { SettingName, type Settings } from '$types/settings';

class UrlParser {
	private url: URL;
	private colorRegex = /^#[a-f0-9]{6}$/i;

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
				if (!this.colorRegex.test('#' + start)) return;
				colors = {
					...colors,
					[nickname]: '#' + start
				};
			} else {
				if (!this.colorRegex.test('#' + start) || !this.colorRegex.test('#' + end)) return;
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

	public getSettings(): Settings {
		return {
			channel: this.getChannel(),
			hiddenNicknames: this.getHiddenNicknames(),
			defaultColor: this.getDefaultColor(),
			nicknameColors: this.getNicknameColors(),
			font: this.getFont()
		};
	}
}

export default UrlParser;
