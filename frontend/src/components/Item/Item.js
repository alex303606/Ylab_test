import React from 'react';
import PropTypes from 'prop-types';
import './Item.scss';
import List from "../List/List";

export default class Item extends React.Component {
	static propTypes = {
		subItems: PropTypes.array,
		title: PropTypes.string.isRequired,
		editorMode: PropTypes.bool.isRequired,
		editItemHandler: PropTypes.func.isRequired,
		inputChangeHandler: PropTypes.func.isRequired,
		inputHandlerKeyPress: PropTypes.func.isRequired,
		saveItem: PropTypes.func.isRequired,
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		value: PropTypes.string,
	};
	
	componentDidUpdate() {
		this.textInput && this.textInput.focus();
	}
	
	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}
	
	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}
	
	handleClickOutside = (event) => {
		if (this.textInput && !this.textInput.contains(event.target)) {
			this.props.saveItem();
		}
	};
	
	setInputRef = (node) => {
		this.textInput = node;
	};
	
	render() {
		const {title, subItems, editorMode, _id, value} = this.props;
		const hasSubItems = !!subItems && subItems.length > 0;
		return (
			<li className="item">
				<div
					onClick={(event) => !value ? this.props.editItemHandler(_id, event) : null}
					className='item_inner'>
					{
						editorMode ? <input
								onKeyPress={this.props.inputHandlerKeyPress}
								ref={this.setInputRef}
								onChange={this.props.inputChangeHandler}
								value={value}
								onClick={e => e.stopPropagation()}
								className='item_input' type="text"/> :
							<span className='item_title'>{title}</span>
					}
				</div>
				{hasSubItems &&
				<List
					items={subItems}
					value={this.props.value}
					editItemHandler={this.props.editItemHandler}
					inputChangeHandler={this.props.inputChangeHandler}
					inputHandlerKeyPress={this.props.inputHandlerKeyPress}
					saveItem={this.props.saveItem}
				/>
				}
			</li>
		);
	}
}