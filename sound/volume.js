const Audio = await Service.import('audio');
const Mpris = await Service.import('mpris');

export function AudioWidget(settings = {}, monitor = 0) {
	const AudioSlider = (type = 'speaker', icon) => Widget.Box({
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
				icon: icon,
				size: 20,
			}),
		]
	});

	// TODO Terminar 
	const PlayerList = () => {
		const PlayerListItems = [];
		for (var player in Mpris.players) {
			//Widget.Button({
				//onClicked: () => player.playPause(),
				//child: Widget.Label().hook(player, label => {
					//const { track_artists, track_title } = player;
					//label.label = `${track_artists.join(', ')} - ${track_title}`;
				//}),
			//}),
		}

		return Widget.Box({
			children: PlayerListItems,
		});
	};

	const Players = Widget.ListBox({
		setup(self) {
			self.add(PlayerList())
		}
	})
	//

	const AudioWindow = Widget.Window({
		name: `audio${monitor}`,
		monitor: monitor,
		visible: false,
		anchor: ['top', 'right'],
		margins: [20, 10],
		layer: 'overlay',
		child: Widget.Box({
			css: 
				`min-width: ${settings.audio.window.width}px;` +
				`min-height: ${settings.audio.window.height}px;`
			,
			children: [
				AudioSlider('speaker', settings.audio.icon.speaker),
				AudioSlider('microphone', settings.audio.icon.microphone),
				Players,
			]
		}),
	});

	const AudioButton = () => Widget.ToggleButton({
		className: 'button',
		child: Widget.Icon({
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
