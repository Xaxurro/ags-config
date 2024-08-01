import { settings } from '../settings.js'

export function WhenTaskWindow(monitor = 0, whenDataVar) {

	const addChildrenToWhenList = (widget) => {
		const whenData = whenDataVar.value;
		for (let i = 0; i < whenData.length; i++) {
			const label = Widget.Label({
				hpack: 'start',
				label: whenData[i],
			})
			widget.add(label);
		}
		console.log(widget);
	}

	const WhenList = () => Widget.ListBox({
		setup(self) {
			addChildrenToWhenList(self);
		}
	}).hook(whenDataVar, self => {
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
