import React, {Component} from "react";
import "./searchBar.scss";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: "",
        };

        this.timeout = null;
    }

    render() {
        const {searchField} = this.state;
        const {isLoading = false} = this.props;
        return (
            <div className={"search-bar"}>
                <div className={"search-input-group"}>
                    <input name={"searchField"} value={searchField}
                           onChange={this.onChange} disabled={isLoading}
                           placeholder={"Search by project name, project start/end date"}/>
                    <i className={"fas fa-search"}></i>
                </div>
            </div>
        );
    }

    onChange = (e) => {
        const {onSearchUpdate} = this.props;
        const {name, value} = e.target;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            onSearchUpdate(value);
        }, 500);

        this.setState({
            [name]: value
        });
    };
}