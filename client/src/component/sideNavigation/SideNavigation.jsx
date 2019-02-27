import React, {Component} from "react";
import "./sideNavigation.scss";

export default class SideNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        };
    }

    render() {
        const {activeIndex} = this.state;
        return (
            <div className={"side-bar"}>
                <div className={"side-header"}>HI,ROBINSON</div>
                <div className={"side-menu"}>
                    <MenuItems index={activeIndex} onClick={this.onClick}/>
                </div>
            </div>
        );
    }

    onClick = (activeIndex) => {
        this.setState({activeIndex});
    };
}

const MenuItems = (props) => {
    const {onClick, index} = props;
    const menuList = [
        {label: "Search", iconClass: "fa-search"},
        {label: "Document", iconClass: "fa-folder"},
        {label: "Logout", iconClass: "fa-sign-out-alt"}
    ];

    return menuList.map((listItem, i) => {
        const customClass = (i === index && "active") || (listItem.label.toLowerCase() === "logout" && "side-footer") || "";
        if (listItem.label.toLowerCase() === "logout") {
            return (
                <div key={listItem.label} className={customClass} onClick={() => onClick(0)}>
                    <i className={`fas ${listItem.iconClass} menu-item-icon`}></i><span
                    className={"menu-label"}>{listItem.label}</span>
                    <i className={`fas ${listItem.iconClass} menu-collapse-icon`}></i>
                </div>
            );
        } else {
            return (
                <div key={listItem.label} className={customClass} onClick={() => onClick(i)}>
                    <i className={`fas ${listItem.iconClass} menu-item-icon`}></i>
                    <span className={"menu-label"}>{listItem.label}</span>
                    <i className={`fas ${listItem.iconClass} menu-collapse-icon`}></i>
                </div>
            );
        }
    });

};
