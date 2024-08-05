App.addIcons(`${App.configDir}/assets`);
const Mpris = await Service.import('mpris');

export function MusicWidget(settings = {}, monitor = 0) {
	const position = Variable(0, {
		poll: [1000, () => {
			return Mpris.getPlayer('mpd')?.position || 0;
		}]
	});

	const length = Variable(0, {
		poll: [1000, () => {
			return Mpris.getPlayer('mpd')?.length || 0;
		}]
	});

	function songData() {
		const mpd = Mpris.getPlayer('mpd');
		if (!mpd) {
			return '';
		}

		let artists = '';
		let track = '';

		// Return name of file if downloaded with yt-dlp
		if (mpd.track_artists[0] === "unknown artist") {
			const ytDlpRegex = / \[.+]\..+$/
			track = mpd.track_title.replace(ytDlpRegex, '');

			const nonTrackTitleWords = [' ', 'Official', 'Oficial', 'Audio', 'Music', 'Video', 'Clip', 'Letra', 'Full'].join('|');
			const nonTrackTitleRegex = new RegExp('\\((' + nonTrackTitleWords + ')+\\)', 'i');
			track = track.replace(nonTrackTitleRegex, '');

			return track;
		}

		artists = mpd.track_artists.join(', ');
		track = mpd.track_title;
		return `${artists} - ${track}`;
	}

	const songSlider = () => Widget.Slider({
		min: 0,
		max: 1,
		hexpand: true,
		setup: self => {
			self.hook(Mpris, () => {
				if (Mpris.getPlayer('mpd')) {
					if (position.is_polling) {
						position.startPoll()
					}
				} else {
					position.stopPoll()
				}
			}).hook(Mpris, () => {
				if (Mpris.getPlayer('mpd')) {
					if (length.is_polling) {
						length.startPoll()
					}
				} else {
					length.stopPoll()
				}
			});
		},
		value: 0,
	});

	const MusicWindow = Widget.Window({
		name: `music${monitor}`,
		className: 'window',
		monitor: monitor,
		visible: false,
		anchor: ['top'],
		margins: [20, 20],
		layer: 'overlay',
		child: Widget.Box({
			className: 'music-box',
			children: [
				songSlider()
			]
		}),
	});

	const MusicCurrentSong = Widget.Label({
		label: songData(),
	}).hook(Mpris, (self, busName) => {
		self.label = songData();
	}, 'player-changed');

	const MusicStatusSong = Widget.Icon({
		className: 'music-icon-disabled',
		icon: settings.music.icon,
		size: 20,
	}).hook(Mpris, (self, busName) => {
		const mpd = Mpris.getPlayer('mpd');
		if (!mpd || mpd.play_back_status == 'Paused') {
			self.class_name = 'music-icon-disabled';
		} else {
			self.class_name = 'music-icon-enabled';
		}
	}, 'player-changed');

	return Widget.Button({
		className: 'button',
		child: Widget.Box({
			spacing: 8,
			children: [
				MusicCurrentSong,
				MusicStatusSong
			]
		}),
		onPrimaryClick: () => {
			MusicWindow.visible = !MusicWindow.visible;
		},
		onSecondaryClick: () => {
			Utils.exec('mpc repeat');
			const repeat = Utils.exec('mpc status "%repeat%"')
			MusicCurrentSong.toggleClassName('music-repeat', repeat == 'on')
		}
	});
}
