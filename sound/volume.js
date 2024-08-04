App.addIcons(`${App.configDir}/assets`);
const Audio = await Service.import('audio');

export function AudioWidget(settings = {}, monitor = 0) {
	const AudioSlider = (type = 'speaker', icon = '') => Widget.Box({
		vertical: true,
		hexpand: true,
		children: [
			Widget.Slider({
				orientation: 1,
				min: 0,
				max: 1.5,
				inverted: true,
				vexpand: true,
				drawValue: false,
				onChange: ({ value }) => Audio[type].volume = value,
				value: Audio[type].bind('volume'),
			}),
			Widget.Label({
				label: Audio[type].bind('volume').as(volume => `${Math.floor(volume * 100)}%`),
			}),
			Widget.Icon({
				css: 'color: #000000;',
				icon: icon,
				size: 20,
			}),
		]
	});

	const AudioWindow = Widget.Window({
		name: `audio${monitor}`,
		monitor: monitor,
		className: 'window',
		visible: false,
		anchor: ['top', 'right'],
		margins: [20, 20],
		layer: 'overlay',
		child: Widget.Box({
			className: 'audio-box',
			children: [
				AudioSlider('speaker', settings.audio.icon.speaker),
				AudioSlider('microphone', settings.audio.icon.microphone),
			]
		}),
	});

	const AudioButton = () => Widget.ToggleButton({
		className: 'button',
		child: Widget.Icon({
			css: 'color: #000000;',
			icon: settings.audio.icon.button,
			size: 20,
		}),
		onToggled: ({ active }) => {

			AudioWindow.visible = active;
		}
	});

	return Widget.Box({
		spacing: 8,
		hpack: 'start',
		child: AudioButton(),
	});
}
