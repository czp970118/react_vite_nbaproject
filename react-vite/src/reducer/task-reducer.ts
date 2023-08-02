export const taskReducer = (taskList: any[], actions: any) => {
	switch (actions.type) {
		case 'add': {
			return [...taskList, actions.value]
		}
		case 'delete': {
			return taskList.filter((item) => item.id !== actions.id)
		}
		case 'edit': {
			console.log('到了这里', actions)
			return taskList.map((item) => {
				if (item.id === actions.id) {
					return { ...item, edit: true }
				} else {
					return item
				}
			})
		}
		case 'update': {
			const { id, text } = actions.value;
			return taskList.map((item) => {
				if (item.id === id) {
					return { ...item, text, edit: false }
				} else {
					return item
				}
			})
		}
		default: {
			throw Error('Unknown action: ' + actions.type);
		}

	}
}