import type { HSL } from '$types/color';

function hexToHSL(hex: string): HSL {
	if (hex === null) return { hue: 0, saturation: 0, lightness: 0 };
	let r = 0;
	let g = 0;
	let b = 0;
	if (hex.length == 4) {
		r = Number('0x' + hex[1] + hex[1]);
		g = Number('0x' + hex[2] + hex[2]);
		b = Number('0x' + hex[3] + hex[3]);
	} else if (hex.length == 7) {
		r = Number('0x' + hex[1] + hex[2]);
		g = Number('0x' + hex[3] + hex[4]);
		b = Number('0x' + hex[5] + hex[6]);
	}
	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b);
	let cmax = Math.max(r, g, b);
	let delta = cmax - cmin;
	let hue = 0;
	let saturation = 0;
	let lightness = 0;

	if (delta == 0) hue = 0;
	else if (cmax == r) hue = ((g - b) / delta) % 6;
	else if (cmax == g) hue = (b - r) / delta + 2;
	else hue = (r - g) / delta + 4;

	hue = Math.round(hue * 60);

	if (hue < 0) hue += 360;

	lightness = (cmax + cmin) / 2;
	saturation = delta == 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
	saturation = +(saturation * 100).toFixed(1);
	lightness = +(lightness * 100).toFixed(1);

	return {
		hue,
		saturation,
		lightness
	};
}

export default hexToHSL;
