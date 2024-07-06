export function AlarmWidget(monitor = 0) {
	const AlarmTimeSelector = () => Widget.SpinButton({
		range: [0, 60],
		increments: [1, 5],
		value: 0
	});

	const AlarmTimeSelectorSeconds = AlarmTimeSelector();
	const AlarmTimeSelectorMinutes = AlarmTimeSelector();
	const AlarmTimeSelectorHours = AlarmTimeSelector();

	const targetTime = Variable(0);
	const startTime = Variable(0);
	const currentTime = Variable(0, {
		poll: [1000, 'date +%s', secondsSinceEpoch => parseInt(secondsSinceEpoch)]
	});

	var shouldContinue = false;

	const getTargetTime = () => {
		return getRemainingTimeInSeconds() + parseInt(Utils.exec('date +%s'));
	};

	const getRemainingTimeInSeconds = () => {
		return AlarmTimeSelectorSeconds.value + (AlarmTimeSelectorMinutes.value * 60) + (AlarmTimeSelectorHours.value * 3600);
	}
	
	const AlarmButtonStart = Widget.Button({
		label: 'start',
		onClicked: () => {
			targetTime.setValue(getTargetTime());
			startTime.setValue(currentTime.value);
			AlarmButtonStop.set_property('active', true);
		},
	});

	const AlarmButtonStop = Widget.ToggleButton({
		label: 'stop',
		onToggled: ({ active }) => {
			shouldContinue = active;
			console.log('shouldContinue: ' + shouldContinue);
		},
	});

	const AlarmButtonReset = Widget.Button({
		label: 'reset',
		onClicked: () => {
			AlarmTimeSelectorSeconds.value = 0;
			AlarmTimeSelectorMinutes.value = 0;
			AlarmTimeSelectorHours.value = 0;
			AlarmButtonStop.set_property('active', true);
		},
	});

	const AlarmTimeSelectorBox = (label = '', AlarmTimeSelector) => Widget.Box({
		vertical: true,
		children: [
			Widget.Label(label),
			AlarmTimeSelector
		]
	});

	const AlarmTimeBox = Widget.Box({
		children: [
			AlarmTimeSelectorBox('Hours', AlarmTimeSelectorHours),
			Widget.Label(':'),
			AlarmTimeSelectorBox('Minutes', AlarmTimeSelectorMinutes),
			Widget.Label(':'),
			AlarmTimeSelectorBox('Seconds', AlarmTimeSelectorSeconds),
		],
	});

	const AlarmButtonBox = Widget.Box({
		children: [
			AlarmButtonStart,
			AlarmButtonStop,
			AlarmButtonReset,
		],
	});

	const AlarmBox = Widget.Box({
		vertical: true,
		children: [
			AlarmTimeBox,
			AlarmButtonBox,
		]
	});

	const AlarmWindow = Widget.Window({
		name: `alarm${monitor}`,
		monitor: monitor,
		layer: 'overlay',
		child: AlarmBox,
		visible: false,
	});

	return Widget.Button({
		className: 'alarm-button',
		child: Widget.CircularProgress({
			rounded: true,
			startAt: 0,
			endAt: 1,
			value: currentTime.bind().as(currentTime => {
				if (targetTime.value === 0) return 0;
				const percentage = (currentTime - startTime.value) / (targetTime.value - startTime.value);
				if (percentage >= 1) {
					return 1;
				}
				return percentage;
			}),
		}),
		onPrimaryClick: () => {
			AlarmWindow.visible = !AlarmWindow.visible;
		},
	});
}
