import { WhenTasksBox } from '../pop_ups/when_tasks.js'

export function TimeWidget(settings, monitor = 1) {
	const date = Variable('', {
		poll: [1000, 'date +%d-%m-%Y%t%T']
	});

	const DateBox = () => Widget.Box({
		vertical: true,
		spacing: 8,
		hpack: 'start',
		children: [
			DateWidget(),
			TimeWidget(),
		]
	});

	const DateWidget = () => Widget.Label({
		hpack: 'fill',
		label:date.bind().as(date => `${date.substring(0, date.indexOf('\t'))}`)
	});

	const TimeWidget = () => Widget.Label({
		hpack: 'start',
		label:date.bind().as(date => `${date.substring(date.indexOf('\t') + 1)}`)
	});

	const CalendarWidget = () => Widget.Calendar({
		showDetails: false,
		showHeading: true,
		showWeekNumbers: true,
	});

	const CalendarWindow = Widget.Window({
		name: `calendar${monitor}`,
		monitor: monitor,
		anchor: ['top', 'left'],
		layer: 'overlay',
		child: CalendarWidget(),
		visible: false,
	});

	const WhenWindow = Widget.Window({
		name: `when${monitor}`,
		monitor: monitor,
		anchor: ['top'],
		layer: 'overlay',
		child: WhenTasksBox(),
		visible: false,
	});

	const CalendarButton = () => Widget.Button({
		className: 'calendar-button',
		child: DateBox(),
		onPrimaryClick: () => {
			CalendarWindow.visible = !CalendarWindow.visible;
		},
		onSecondaryClick: () => {
			WhenWindow.visible = !WhenWindow.visible;
		},
		onMiddleClick: () => {
			Utils.execAsync(['zsh', '-c', 'date +%d-%m-%Y | wl-copy'])
		},
		tooltipText: 'Left Click\t\t: Calendar\nRight Click\t\t: When\nMiddle Click\t: Copy Date',
	});

	return Widget.Box({
		spacing: 8,
		hpack: 'start',
		child: CalendarButton(),
	});
}
