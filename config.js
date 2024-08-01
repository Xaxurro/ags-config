App.addIcons(`${App.configDir}/assets`);
const Hyprland = await Service.import('hyprland');
import { settings } from './settings.js'
import { TimeWidget } from './status_bar/time.js'
import { WorkspacesWidget } from './status_bar/workspaces.js'
import { SystemTrayWidget } from './status_bar/systray.js'
import { AudioWidget } from './status_bar/sound.js'
//import { Notification } from './notifications.js';
import { AlarmWidget } from './pop_ups/alarm.js';

const StartWidget = (monitor = 0) => Widget.Box({
	children: [
		TimeWidget(settings, monitor),
		AlarmWidget(monitor),
	]
})

const CenterWidget = (settings) => Widget.Box({
	children: [
		WorkspacesWidget(settings, Hyprland),
		//Notification(settings),
	]
})

const EndWidget = (monitor = 0) => Widget.Box({
	hpack: 'end',
	children: [
		AudioWidget(settings, monitor),
		SystemTrayWidget(settings),
	]
})

const StatusBar = (monitor = 0) => Widget.Window({
	monitor,
	className: 'status-bar',
	name: `bar${monitor}`,
	exclusivity: 'exclusive',
	anchor: ['top', 'left', 'right'],
	child: Widget.CenterBox({
		spacing: 8,
		vertical: false,
		startWidget: StartWidget(monitor),
		centerWidget: CenterWidget(settings),
		endWidget: EndWidget(monitor),
	}) 
})


App.config({ 
	style: './style.css',
	gtkTheme: settings.gtkTheme,
	windows: [
		StatusBar(0),
		StatusBar(1),
	] 
})
