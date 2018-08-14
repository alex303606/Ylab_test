import React from 'react';
import PropTypes from 'prop-types';
import './List.scss';
import Item from "../Item/Item";

export default class List extends React.Component {
	static propTypes = {
		items: PropTypes.array.isRequired,
		editItemHandler: PropTypes.func.isRequired,
		inputChangeHandler: PropTypes.func.isRequired,
		inputHandlerKeyPress: PropTypes.func.isRequired,
		saveItem: PropTypes.func.isRequired,
		value: PropTypes.string,
	};
	
	renderItem = (item) => {
		return (
			<Item
				value={this.props.value}
				editItemHandler={this.props.editItemHandler}
				inputChangeHandler={this.props.inputChangeHandler}
				inputHandlerKeyPress={this.props.inputHandlerKeyPress}
				key={item.id}
				saveItem={this.props.saveItem}
				{...item}/>
		);
	};
	
	render() {
		const {items} = this.props;
		return (
			<ul className='list'>
				{items.map(this.renderItem)}
			</ul>
		);
	}
}
