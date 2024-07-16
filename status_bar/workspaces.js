export function WorkspacesWidget (settings, Hyprland) {
	function workspaceLabels() {
		const HyprlandWorkspaces = Hyprland.workspaces;
		const focusId = Hyprland.active.workspace.id;
	
		const workspaces = []

		const HyprlandWorkspaceIds = [];
		HyprlandWorkspaces.forEach(ws => {
			HyprlandWorkspaceIds.push(ws.id);
		})
	
		for (let i = 1; i < settings.workspace.listSize + 1; i++) {
			let icon	= settings.workspace.empty.icon;
			let className	= settings.workspace.empty.className;
	
			if (HyprlandWorkspaceIds.includes(i)) {
				icon		= settings.workspace.active.icon;
				className	= settings.workspace.active.className;
			}
	
			if (i == focusId) {
				icon		= settings.workspace.focused.icon;
				className	= settings.workspace.focused.className;
			}
	
			workspaces.push(
				Widget.Box({
					css: 
						`min-width: ${settings.workspace.width}px;` +
						`min-height: ${settings.workspace.height}px;`
					,
					child: Widget.Label({
						hexpand		: true,
						vexpand		: true,
						label		: icon,
						className	: className,
					})
			}));
		}

		return workspaces;
	}

	return Widget.Box({
		spacing: 8,
		children: workspaceLabels(),
	}).hook(Hyprland, (self, ipcEvent) => {
		const ipcEvents = ['workspace', 'movewindow', 'activewindow', 'focusedmon', 'moveworkspace', 'createworkspace', 'destroyworkspace']
		if (ipcEvents.includes(ipcEvent)) {
			self.children = workspaceLabels();
		}
	}, 'event')
}
