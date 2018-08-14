import React, { Component } from 'react';
import Items from "./containers/Items/Items";
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class App extends Component {
	render() {
		return (
			<div className="container">
				<NotificationContainer/>
				<Items/>
			</div>
		)
	}
}