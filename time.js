import { WhenTaskWindow } from './when_tasks.js'

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

	const whenData = Variable(Utils.exec(`/usr/bin/when --past=0 --future=${settings.when.futureDays}`).split('\n').splice(2));
	const WhenWindow = WhenTaskWindow(monitor, whenData);

	const CalendarButton = () => Widget.Button({
		className: 'button calendar',
		child: DateBox(),
		onPrimaryClick: () => {
			CalendarWindow.visible = !CalendarWindow.visible;
		},
		onSecondaryClick: () => {
			whenData.setValue(Utils.exec(`/usr/bin/when --past=0 --future=${settings.when.futureDays}`).split('\n').splice(2));
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
