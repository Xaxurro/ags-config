export function CalendarWindow(monitor = 0) {
	const CalendarWidget = () => Widget.Calendar({
		className: 'window',
		showDetails: false,
		showHeading: true,
		showWeekNumbers: true,
	});

	return Widget.Window({
		name: `calendar${monitor}`,
		monitor: monitor,
		anchor: ['top', 'left'],
		layer: 'overlay',
		child: CalendarWidget(),
		visible: false,
	});
}
