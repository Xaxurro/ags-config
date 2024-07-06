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
			let icon= settings.workspace.default.icon;
			let css	= settings.workspace.default.css
	
			if (HyprlandWorkspaceIds.includes(i)) {
				icon	= settings.workspace.active.icon;
				css	= settings.workspace.active.css;
			}
	
			if (i == focusId) {
				icon	= settings.workspace.focused.icon;
				css	= settings.workspace.focused.css;
			}
	
			workspaces.push(Widget.Label({
				label	: icon,
				css	: css,
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
