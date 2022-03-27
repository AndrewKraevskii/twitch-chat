import type { UserNicknameColor } from '$types/nickname';
import { SettingName } from '$types/settings';

class UrlEncoder {
	private channel: string;
	private hiddenNicknames: string[];
	private defaultColor: string;
	private font: string;
	private customColor: UserNicknameColor;

	constructor(
		channel: string,
		hiddenNicknames: string[],
		defaultColor: string | undefined,
		customColor: UserNicknameColor,
		font: string
	) {
		this.channel = channel;
		this.hiddenNicknames = hiddenNicknames;
		this.defaultColor = defaultColor;
		this.customColor = customColor;
		this.font = font;
	}

	private setChannelToUrl(url: URL): URL {
		url.pathname = '/' + this.channel;
		return url;
	}

	private setHiddenNicknamesToUrl(url: URL): URL {
		if (this.hiddenNicknames.length !== 0) {
			url.searchParams.append(SettingName.HiddenNicknames, this.hiddenNicknames.join(','));
		}
		return url;
	}

	private setDefaultColorToUrl(url: URL): URL {
		if (this.defaultColor) {
			url.searchParams.append(SettingName.DefaultColor, this.defaultColor.replace('#', ''));
		}
		return url;
	}

	private setCustomNicknameColorsToUrl(url: URL): URL {
		if (Object.keys(this.customColor).length !== 0) {
			let v = [];
			Object.keys(this.customColor).forEach((nickname) => {
				const color = this.customColor[nickname];
				if (typeof color === 'string') {
					v.push(`${nickname}:${color.replace('#', '')}`);
				} else {
					v.push(`${nickname}:${color.start.replace('#', '')}:${color.end.replace('#', '')}`);
				}
			});

			url.searchParams.append(SettingName.CustomNicknameColors, v.join(','));
		}
		return url;
	}

	private setFontToUrl(url: URL): URL {
		if (this.font) {
			url.searchParams.append(SettingName.Font, this.font);
		}
		return url;
	}

	public getLink(): URL {
		let url = new URL(window.location.origin);

		url = this.setChannelToUrl(url);
		url = this.setHiddenNicknamesToUrl(url);
		url = this.setDefaultColorToUrl(url);
		url = this.setCustomNicknameColorsToUrl(url);
		url = this.setFontToUrl(url);

		return url;
	}
}

export default UrlEncoder;
