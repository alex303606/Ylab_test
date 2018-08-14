import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import List from "../../components/List/List";
import { bindActionCreators } from 'redux';
import * as WorkspaceListActions from '../../store/actions/items';
import './Items.scss';

class Items extends Component {
	
	static propTypes = {
		items: PropTypes.array.isRequired,
		editorElem: PropTypes.object.isRequired,
		actions: PropTypes.shape({
			fetchItems: PropTypes.func.isRequired,
			enableEditorMode: PropTypes.func.isRequired,
			saveItem: PropTypes.func.isRequired,
			changeEditorElem: PropTypes.func.isRequired,
		}).isRequired,
	};
	
	componentDidMount() {
		this.props.actions.fetchItems();
	}
	
	editItem = (_id, event) => {
		event.stopPropagation();
		this.props.actions.enableEditorMode(_id);
	};
	
	inputChangeHandler = event => {
		this.props.actions.changeEditorElem(event.target.value);
	};
	
	handlerKeyPress = (event) => {
		if (event.key === 'Enter') this.props.actions.saveItem();
	};
	
	render() {
		return this.props.items.length !== 0 ? (
			<List
				value={this.props.editorElem.title}
				items={this.props.items}
				saveItem={this.props.actions.saveItem}
				editItemHandler={this.editItem}
				inputChangeHandler={this.inputChangeHandler}
				inputHandlerKeyPress={this.handlerKeyPress}
			/>
		) : <h2 className='loading-message'>Loading...</h2>;
	}
}

const mapStateToProps = state => ({
	items: state.items.items,
	editorElem: state.items.editorElem,
});

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(WorkspaceListActions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(Items);