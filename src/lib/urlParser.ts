import type { UserNicknameColor } from '$types/nickname';

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
		const hidden = this.url.searchParams.get('hidden');
		if (!hidden) return [];
		return hidden.split(',');
	}

	public getDefaultColor(): string | undefined {
		const defaultColor = this.url.searchParams.get('defaultColor');
		if (!defaultColor) return undefined;
		return '#' + defaultColor;
	}

	public getNicknameColors(): UserNicknameColor {
		let colors: UserNicknameColor = {};
		const custom = this.url.searchParams.get('custom');

		custom.split(',').forEach((nicknameWithColors) => {
			const [nickname, start, end] = nicknameWithColors.split(':');
			if (!end) {
				colors = {
					...colors,
					[nickname]: '#' + start
				};
			} else {
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
}

export default UrlParser;
