const SystemTray = await Service.import('systemtray');
export function SystemTrayWidget(settings) {
	const SystemTrayItem = item => Widget.Button({
		className: 'button',
		child: Widget.Icon().bind('icon', item, 'icon'),
		tooltipMarkup: item.bind('tooltip_markup'),
		onPrimaryClick: (_, event) => item.activate(event),
		onSecondaryClick: (_, event) => item.openMenu(event),
	})

	return Widget.Box({
		children: SystemTray.bind('items').as(i => i.map(SystemTrayItem))
	})
}
