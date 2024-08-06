import { WhenWindow } from './when.js'
import { CalendarWindow } from './calendar.js'
import { DateWidget } from './date.js'

export function TimeWidget(monitor = 0) {

	const calendarWindow = CalendarWindow(monitor);

	let whenWindow = WhenWindow(monitor);

	const CalendarButton = () => Widget.Button({
		className: 'button calendar',
		child: DateWidget(),
		onPrimaryClick: () => {
			calendarWindow.visible = !calendarWindow.visible;
		},
		onSecondaryClick: () => {
			if (whenWindow.visible == false) {
				whenWindow = WhenWindow(monitor);
			}
			whenWindow.visible = !whenWindow.visible;
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
