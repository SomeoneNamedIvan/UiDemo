import React, {Component} from "react";
import SearchBar from "../../component/searchBar/SearchBar";
import WsReq from "../../ws/WsReq";
import moment from "moment";
import {Row, Col} from "reactstrap";
import projectIcon from "../../../assets/avanade.png";
import "./landingPage.scss";

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            cards: [],
            total: 0,
            filteredCards: [],
            filtered: false
        };
    }

    async componentDidMount() {
        await this.fetchData();
    }

    render() {
        const {isLoading, total, cards, filteredCards, filtered} = this.state;
        const list = filtered ? filteredCards : cards;
        const cardNodes = list.map((card, i) => <Col className={"card-node"} key={`cardNode-${i}`} md={6}><CardNode
            card={card}/></Col>);
        return (
            <div className={"landing-page"}>
                <SearchBar onSearchUpdate={this.onSearchUpdate} isLoading={isLoading}/>
                <TitleBar total={total}/>
                <Row>{cardNodes}</Row>
            </div>
        );
    }


    onSearchUpdate = (value) => {
        const filtered = !value && false || true;
        const {cards} = this.state;
        const filteredCards = cards.filter(card => {
            return card.startDate.includes(value) || card.endDate.includes(value) || card.name.includes(value);
        });

        this.setState({filteredCards, filtered});
    };

    async fetchData() {
        try {
            let cards = await WsReq.shared.getCards();
            cards = cards.map(card => {
                card.startDate = moment(card.startDate).format("MM/DD/YYYY");
                card.endDate = moment(card.endDate).format("MM/DD/YYYY");
                return card;
            });
            this.setState({isLoading: false, cards, total: cards && cards.length || 0});
        } catch (err) {
            console.error(err);
        }
    }
}

const TitleBar = (props) => {
    const {total} = props;
    return (
        <div className={"title-bar"}>
            <h3>My Projects</h3>
            <span>{total} in total</span>
            <div className={"action-button"}><span>+</span></div>
        </div>
    );
};

const CardNode = (props) => {
    const {card} = props;
    // const startDate = moment(card.startDate).format("MM/DD/YYYY");
    // const endDate = moment(card.endDate).format("MM/DD/YYYY");
    const getIconName = (type) => {
        switch (type) {
            case "001":
                return "fas fa-folder";
            case "002":
                return "far fa-chart-bar ";
            case "003":
                return "far fa-user-circle";
        }
    };
    const purposes = card && card.purposes && card.purposes.map(purpose => {
        const iconName = getIconName(purpose.type);
        return (
            <span className={"purpose-node"}><i className={iconName}/>{purpose.name}</span>
        );
    }) || "";
    return (
        <Row>
            <Col md={4}>
                <img src={projectIcon}/>
            </Col>
            <Col md={8} className={"project-card"}>
                <h4><i className={"fas fa-folder"}/>{card.name}</h4>
                <div>{purposes}</div>
                <div>
                    <h6 className={"card-sub-labels"}>start/end date</h6>
                    <span className={"card-values"}>{card.startDate} to {card.endDate}</span>
                </div>
                <div className={"cost-field"}>
                    <div>
                        <h6 className={"card-sub-labels"}>ESTIMATED COST</h6>
                        <span className={"card-values"}>{card.estimatedCost}</span>
                    </div>
                    <div>
                        <h6 className={"card-sub-labels"}>PREDICTED COST</h6>
                        <span className={"card-values"}>{card.predictedCost}</span>
                    </div>
                </div>
            </Col>
            <i className="fas fa-ellipsis-v"/>
        </Row>
    );
};