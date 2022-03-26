import type { UserNicknameColor } from '$types/nickname';

class UrlEncoder {
	private channel: string;
	private hiddenNicknames: string[];
	private defaultColor: string | undefined;
	private customColor: UserNicknameColor;

	constructor(
		channel: string,
		hiddenNicknames: string[],
		defaultColor: string | undefined,
		customColor: UserNicknameColor
	) {
		this.channel = channel;
		this.hiddenNicknames = hiddenNicknames;
		this.defaultColor = defaultColor;
		this.customColor = customColor;
	}

	public getLink(): URL {
		const url = new URL(window.location.origin);

		url.pathname = '/' + this.channel;

		if (this.hiddenNicknames.length !== 0) {
			url.searchParams.append('hidden', this.hiddenNicknames.join(','));
		}

		if (this.defaultColor) {
			url.searchParams.append('defaultColor', this.defaultColor.replace('#', ''));
		}

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

			url.searchParams.append('custom', v.join(','));
		}

		return url;
	}
}

export default UrlEncoder;
