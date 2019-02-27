import "./app.scss";
import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import SideNavigation from "./component/sideNavigation/SideNavigation";

export default class App extends React.Component {

    render() {

        return (
            <React.Fragment>
                <SideNavigation/>
                <div className={"main-content"}>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" component={LandingPage}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </React.Fragment>

        );
    }
}