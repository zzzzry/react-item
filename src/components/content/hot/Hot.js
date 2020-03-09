import React, { Component } from "react";
import "./hot.scss";
export default class Hot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hotList: [],
			title: ""
		};
	}
	componentDidMount() {
		fetch("/api/api/v4/search/top_search/tabs/hot/items")
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					hotList: res.data,
					title: res.data[0].query_display
				});
			});
	
	}
	more = () => {
		this.props.history.push("/more");
	};
	search(value) {
		this.props.history.push({pathname:"/result",state:{value}});
	}
	render() {
		// store.dispatch({ type: "INP", payload: this.state.title });
		
		
		return (
			<div className="hot">
				<h2 className="title">热搜</h2>
				<ul className="hotList">
					{this.state.hotList.map((item, index) => {
						return (
							<li key={index} className="item" onClick={this.search.bind(this, item.real_query)}>
								<p className={`index ${index < 3 ? "sIndex" : ""}`}>{index + 1}</p>
								<div>
									<p>{item.query_display}</p>
									<p>{item.query_description}</p>
								</div>
							</li>
						);
					})}
					<div className="moreHot">
						<span onClick={this.more}>更多热搜内容</span>
						<i className="fa fa-angle-right"></i>
					</div>
				</ul>
			</div>
		);
	}
}
