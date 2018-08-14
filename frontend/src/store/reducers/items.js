import {
	FETCH_ITEMS_SUCCESS,
	ENABLE_EDITOR_MODE,
	CHANGE_EDITOR_ELEM,
	DISABLE_EDITOR_MODE
} from "../actions/actionType";

const initialState = {
	items: [],
	editorElem: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_ITEMS_SUCCESS:
			const root = action.items.find(i => !i.parent);
			const flatten = (item, newItems = action.items) => {
				function getItem(item) {
					if (newItems.filter(i => item.id === i.parent).length !== 0) {
						item.subItems = newItems.filter(i => item.id === i.parent).sort((a, b) => a.id - b.id);
						flatten(item.subItems);
					}
					item.editorMode = false;
					return item;
				}
				
				return Array.isArray(item) ? item.map(getItem) : getItem(item);
			};
			return {...state, items: [...state.items, flatten(root)]};
		case ENABLE_EDITOR_MODE:
			let enableEditorElem = {};
			const searchObjectAndEnableEditorMode = arr => {
				arr.forEach(item => {
					if (item._id === action.id) {
						item.editorMode = true;
						enableEditorElem = item;
					} else if (!!item.subItems) {
						searchObjectAndEnableEditorMode(item.subItems);
					}
				});
			};
			searchObjectAndEnableEditorMode(state.items);
			return {...state, items: [...state.items], editorElem: {...enableEditorElem}};
		case CHANGE_EDITOR_ELEM:
			return {...state, editorElem: {...state.editorElem, title: action.title}};
		case DISABLE_EDITOR_MODE:
			const searchObjectAndDisableEditorMode = arr => {
				arr.forEach(item => {
					if (item._id === state.editorElem._id) {
						item.editorMode = false;
						if (action.save) item.title = state.editorElem.title;
					} else if (!!item.subItems) {
						searchObjectAndDisableEditorMode(item.subItems);
					}
				});
			};
			searchObjectAndDisableEditorMode(state.items);
			return {...state, items: [...state.items], editorElem: {}};
		default:
			return state;
	}
};

export default reducer;