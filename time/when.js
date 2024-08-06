import { settings } from '../settings.js'

export function WhenWindow(monitor = 0) {
	const WhenList = Widget.ListBox({
		setup(self) {
			const tasks = Utils.exec(`/usr/bin/when --past=0 --future=${settings.when.futureDays}`).split('\n').splice(2);
			for (let i = 0; i < tasks.length; i++) {
				const label = Widget.Label({
					hpack: 'start',
					label: tasks[i],
				})
				self.add(label);
			}
		}
	});


	const WhenListHeader = () => Widget.Label({
		className: 'when',
		hpack: 'fill',
		label: 'Weas que tengo que hacer',
	});

	const WhenTaskBox = Widget.Box({
		className: 'when box',
		vertical: true,
		children: [
			WhenListHeader(),
			WhenList,
		]
	});

	return Widget.Window({
		name: `when${monitor}`,
		monitor: monitor,
		anchor: ['top'],
		layer: 'overlay',
		child: WhenTaskBox,
		visible: false,
	});

}
