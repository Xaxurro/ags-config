import { settings } from '../settings.js'

export function WhenTasksBox() {
	const whenDataArray = () => {
		const whenData = Utils.exec(`/usr/bin/when --past=0 --future=${settings.when.futureDays}`).split('\n').splice(2);

		return whenData;
	}

	const WhenList = () => Widget.ListBox({
		setup(self) {
			const whenData = whenDataArray();
			for (let i = 0; i < whenData.length; i++) {
				self.add(Widget.Label({
					hpack: 'start',
					label: whenData[i],
				}));
			}
		}
	});

	const WhenListHeader = () => Widget.Box({
		child: Widget.Label({
			hpack: 'start',
			label: 'Weas que tengo que hacer',
		})
	});

	return Widget.Box({
		vertical: true,
		children: [
			WhenListHeader(),
			WhenList(),
		]
	});
}
