import CommandService, { CommandRuntime, CommandDeclaration, CommandContext } from '@joplinapp/lib/services/CommandService';
import { _ } from '@joplinapp/lib/locale';
import { stateUtils } from '@joplinapp/lib/reducer';

export const declaration:CommandDeclaration = {
	name: 'showNoteProperties',
	label: () => _('Note properties'),
	iconName: 'icon-info',
};

export const runtime = (comp:any):CommandRuntime => {
	return {
		execute: async (context:CommandContext, noteId:string = null) => {
			noteId = noteId || stateUtils.selectedNoteId(context.state);

			comp.setState({
				notePropertiesDialogOptions: {
					noteId: noteId,
					visible: true,
					onRevisionLinkClick: () => {
						CommandService.instance().execute('showRevisions');
					},
				},
			});
		},
		enabledCondition: 'oneNoteSelected',
	};
};
