import React, { Component } from "react";
import { List } from "antd-mobile";
import "./search.scss";
import store from "../../../store/index"
export default class Search extends Component {
	getList = () => {
		var list = this.props.location.state.list;
		// this.setState({ list }, console.log(this.state.list));

		return list;
	};
	search(value) {
		store.dispatch({ type: "INP", payload:value})
		this.props.history.push({pathname:"/result",state:{value}})
	}
	render() {
		var { value } = this.props.location.state;
		return (
			<div className="search">
				<ul>
					{this.getList().map((item, index) => {
						return (
							<li key={index} onClick={this.search.bind(this, item.query)}>
								<List extra={<i className="fa fa-space-shuttle"></i>}>
									<i className="fa fa-search"></i>
									<span>{item.query}</span>
								</List>
							</li>
						);
					})}
					<li className="all">
						<List>查看「{value}」的全部搜索结果</List>
					</li>
				</ul>
			</div>
		);
	}
}
