App.addIcons(`${App.configDir}/assets`);
const Hyprland = await Service.import('hyprland');
import { settings } from './settings.js'
import { TimeWidget } from './time/main.js'
import { WorkspacesWidget } from './workspaces.js'
import { SystemTrayWidget } from './systray.js'
import { AudioWidget } from './sound/volume.js'
import { AlarmWidget } from './time/alarm/main.js';
import { MusicWidget } from './sound/music.js';

const StartWidget = (monitor = 0) => Widget.Box({
	children: [
		TimeWidget(monitor),
		AlarmWidget(monitor),
	]
})

const CenterWidget = (settings) => Widget.Box({
	children: [
		WorkspacesWidget(settings, Hyprland),
	]
})

const EndWidget = (monitor = 0) => Widget.Box({
	hpack: 'end',
	children: [
		MusicWidget(settings, monitor),
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
