import { settings } from './settings.js'

export function WhenWindow(monitor = 0) {
	const whenData = Variable(Utils.exec(`/usr/bin/when --past=0 --future=${settings.when.futureDays}`).split('\n').splice(2));

	const addChildrenToWhenList = (widget) => {
		const tasks = whenData.value;
		for (let i = 0; i < tasks.length; i++) {
			const label = Widget.Label({
				hpack: 'start',
				label: tasks[i],
			})
			widget.add(label);
		}
	}

	const WhenList = () => Widget.ListBox({
		setup(self) {
			addChildrenToWhenList(self);
		}
	}).hook(whenData, self => {
		//addChildrenToWhenList(self);
	});

	const WhenListHeader = () => Widget.Box({
		child: Widget.Label({
			hpack: 'start',
			label: 'Weas que tengo que hacer',
		})
	});

	const WhenTaskBox = Widget.Box({
		vertical: true,
		children: [
			WhenListHeader(),
			WhenList(),
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
