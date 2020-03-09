import React, { Component } from "react";
import { Route, Switch ,Redirect} from "react-router-dom";
import Home from "./home/Home";
import Hot from "./hot/Hot";
import Search from "./search/Search";
import More from "./more/More";
import Result from "./result/Result"
export default class Content extends Component {
	render() {
		return (
			<div className="content">
				<Switch>
					<Route path="/home" component={Home} />
					<Route path="/hot" component={Hot} />
					<Route path="/search" component={Search} />
					<Route path="/more" component={More} />
					<Route path="/result" component={Result}/>
					<Redirect to="/home" exact />
				</Switch>
			</div>
		);
	}
}
