import React, { Component } from "react";
import "./home.scss";
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}
	componentDidMount() {
		this.getList();
	}
	getList = () => {
		fetch("/api/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true")
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					list: res.data
				});
			});
	};
	render() {
		return (
			<div className="home">
				<ul>
					{this.state.list.map((item, index) => {
						return (
							<li key={index}>
								<div>
									<p className="title">{item.target.title}</p>
									{item.children[0].thumbnail ? (
										<div className="imgbox">
											<img
												referrer="no-referrer|origin|unsafe-url"
												src={item.children[0].thumbnail}
												alt=""
											/>
										</div>
									) : (
										""
									)}

									<p className="excerpt">{item.target.excerpt}</p>
									<p className="fire">
										<i className="fa fa-fire"></i>
										<span>{item.detail_text}</span>
									</p>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
