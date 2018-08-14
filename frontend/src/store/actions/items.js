import axios from '../../axios-api';
import { NotificationManager } from 'react-notifications';
import {
	FETCH_ITEMS_SUCCESS,
	ENABLE_EDITOR_MODE,
	CHANGE_EDITOR_ELEM,
	DISABLE_EDITOR_MODE
} from "./actionType";

export const fetchItems = () => {
	return dispatch => {
		return axios.get('/items').then(response => {
			dispatch(fetchItemsSuccess(response.data));
		});
	}
};

const fetchItemsSuccess = items => {
	return {type: FETCH_ITEMS_SUCCESS, items}
};

export const enableEditorMode = id => {
	return {type: ENABLE_EDITOR_MODE, id};
};

const disableEditorMode = save => {
	return {type: DISABLE_EDITOR_MODE, save};
};

export const changeEditorElem = title => {
	return {type: CHANGE_EDITOR_ELEM, title};
};

export const saveItem = () => {
	return (dispatch, getState) => {
		const searchObjectAndEnableEditorMode = arr => {
			arr.forEach(item => {
				if (item.editorMode) {
					if (getState().items.editorElem.title.length < 1 || getState().items.editorElem.title.length > 255) {
						NotificationManager.error('Длина заголовка не меньше 1 символа и не больше 255',
							'Ошибка, изменения не сохранены!');
						dispatch(disableEditorMode());
					} else {
						if (getState().items.editorElem.title !== item.title) {
							return axios.put(`/items/${getState().items.editorElem._id}`,
								getState().items.editorElem).then(
								response => dispatch(disableEditorMode(true)),
								error => console.log(error));
						} else {
							dispatch(disableEditorMode());
						}
					}
				} else if (!!item.subItems) {
					searchObjectAndEnableEditorMode(item.subItems);
				}
			});
		};
		searchObjectAndEnableEditorMode(getState().items.items);
	}
};