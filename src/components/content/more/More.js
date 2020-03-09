import React, { Component } from "react";
import "./more.scss";
export default class More extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hotList: [],
			title: ""
		};
	}
	componentDidMount() {
		this.getList();
	}
	getList = () => {
		fetch("/api/api/v4/search/top_search/tabs/hot/items")
			.then((res) => res.json())
			.then((res) => {
				console.log(res.data);
				this.setState({
					hotList: res.data,
					title: res.data[0].query_display
				});
			});
	};
	search(value) {
		this.props.history.push({ pathname: "/result", state: { value } });
	}
	render() {
		return (
			<div className="more">
				<div className="topImg"></div>
				<div>
					<ul className="list">
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
					</ul>
					<div className="footer">没有更多了</div>
				</div>
			</div>
		);
	}
}
