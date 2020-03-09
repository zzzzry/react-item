import React, { Component } from "react";
import "./result.scss";
import store from "../../../store/index"
export default class Result extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}
	componentWillMount() {
		store.dispatch({ type: "INP", payload: this.props.location.state.value });

		this.getList();
	}
	getList = () => {
		store.dispatch({type:"INP",payload:this.props.location.state.value})
		var list = fetch("/api/api/v4/search_v3?q=" + this.props.location.state.value)
			.then((res) => res.json())
			.then((res) => {
				this.setState({
					list: res.data
				});
			});
		return list;
	};
	render() {
		return (
			<div className="result">
				<ul className="list">
					{this.state.list.map((item, index) => {
						if (item.type === "one_box" || item.type === "relevant_query" || item.type === "knowledge_ad") {
							return "";
						} else {
							return (
								<li key={index} className="item">
									<p
										dangerouslySetInnerHTML={{ __html: item.highlight && item.highlight.title }}
										className="title"></p>
									<div>
										<div className="content">
											<span>
												{item.object && item.object.author && item.object.author.name}:{" "}
											</span>
											<span
												dangerouslySetInnerHTML={{
													__html: item.highlight && item.highlight.description
												}}></span>
										</div>
										<div>
											{item.object &&
											item.object.thumbnail_info &&
											item.object.thumbnail_info.thumbnails[0] &&
											item.object.thumbnail_info.thumbnails[0].url ? (
												<img
													src={
														item.object &&
														item.object.thumbnail_info &&
														item.object.thumbnail_info.thumbnails[0] &&
														item.object.thumbnail_info.thumbnails[0].url
													}
													alt="img"
												/>
											) : (
												""
											)}
										</div>
									</div>
									<div>
										<button className="up">
											<i className="fa fa-caret-up"></i>
											<span> 赞同 {item.object && item.object.voteup_count}</span>
										</button>
										<button className="down">
											<i className="fa fa-caret-down"></i>
										</button>
										<span>
											<i className="fa fa-comment"></i>
											<span> 评论 {item.object && item.object.comment_count}</span>
										</span>
									</div>
								</li>
							);
						}
					})}
				</ul>
			</div>
		);
	}
}
