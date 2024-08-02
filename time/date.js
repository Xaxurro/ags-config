export function DateWidget() {
	const date = Variable('', {
		poll: [1000, 'date +%d-%m-%Y%t%T']
	});

	const TimeLabel = () => Widget.Label({
		hpack: 'start',
		label:date.bind().as(date => `${date.substring(date.indexOf('\t') + 1)}`)
	});

	const DateLabel = () => Widget.Label({
		hpack: 'fill',
		label:date.bind().as(date => `${date.substring(0, date.indexOf('\t'))}`)
	});

	return Widget.Box({
		vertical: true,
		spacing: 8,
		hpack: 'start',
		children: [
			DateLabel(),
			TimeLabel(),
		]
	});
}
