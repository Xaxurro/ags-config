export const monitor = Variable(0);
globalThis.monitor = monitor;

const ItemList = () => Widget.ListBox({
	setup(self) {
		self.add(
			Widget.Button({
				label: 'Clipboard',
				onClicked: () => {console.log('Minecraft Server')},
			})
		);
		self.add(
			Widget.Button({
				label: 'Minecraft Server',
				onClicked: () => {console.log('Minecraft Server')},
			})
		);
	},
});

const MenuWindow = (monitor = 0) => Widget.Window({
	name: `menu${monitor}`,
	monitor: monitor,
	layer: 'overlay',
	child: ItemList(),
	visible: true,
});



App.config({ 
	style: './style.css',
	windows: [
		MenuWindow(monitor.value),
	] 
})
