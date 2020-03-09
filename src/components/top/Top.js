import React, { Component } from "react";
import { SearchBar, List } from "antd-mobile";
import "./top.scss";
import { withRouter } from "react-router-dom";
import store from "../../store/index";
const Item = List.Item;

class Top extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vis: true,
			title: store.getState().input,
			value: store.getState().input
		};
		store.subscribe(() => {
			console.log(store.getState().input);
			this.setState({
				title: store.getState().input,
				value: store.getState().input
			});
		});
	}
	componentDidMount() {
		this.showMenu();
	}
	showMenu = (e) => {
		this.setState({
			vis: !this.state.vis
		});
		this.menu.children[0].style.display = this.state.vis ? "none" : "block";
		this.refs.menuBtn.className = this.state.vis ? "fa fa-bars" : " fa fa-close ";
	};
	subMit = (e) => {
		this.setState(
			{
				value: ""
			},
			console.log(this.state.value)
		);
		this.props.history.push({ pathname: "/result", state: { value: e } });
	};
	focus = () => {
		this.props.history.push("/hot");
	};
	blur = () => {};
	change = (e) => {
		fetch("/api/api/v4/search/suggest?q=" + e)
			.then((res) => res.json())
			.then((res) => {
				this.props.history.push({ pathname: "/search", state: { list: res.suggest, value: e } });
			});
		this.setState({
			value: e
		});
	};
	cancel = () => {
		this.props.history.push("/home");
		this.setState({
			value: "" 
		});
	};
	goHome = () => {
		this.props.history.push("/home");
		this.setState({
			value: ""
		});
	};
	render() {
		return (
			<div className="top">
				<header className="header">
					<h1 onClick={this.goHome}>知 乎</h1>
					<SearchBar
						placeholder={this.state.title}
						value={this.state.value}
						maxLength={8}
						onSubmit={this.subMit}
						onFocus={this.focus}
						onBlur={this.blur}
						onChange={this.change}
						onCancel={this.cancel}
					/>
					<i className="fa fa-bars" onClick={this.showMenu} ref="menuBtn"></i>
					<div
						ref={(menu) => {
							this.menu = menu;
						}}>
						<List renderHeader={() => ""} className="menu-list">
							<Item className="list-item" onClick={this.goHome}>
								<i className="fa fa-file-text"></i>
								<span>首页</span>
							</Item>
							<Item className="list-item">
								<i className="fa fa-user"></i>
								<span>我的主页</span>
							</Item>
							<Item className="list-item">
								<i className="fa fa-sign-out"></i>
								<span>退出账号</span>
							</Item>
						</List>
					</div>
				</header>
			</div>
		);
	}
}
export default withRouter(Top);
