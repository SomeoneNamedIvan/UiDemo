export default class WsReq {
    static get shared() {
        if (WsReq.instance == null || WsReq.instance === undefined) {
            WsReq.instance = new WsReq();

        }
        return WsReq.instance;
    }

    constructor() {
        this.apiUrl = "http://localhost:9005/v1";
    }

    async callApi(endpointUrl, method = "GET") {
        const request = {};
        request.method = method;
        try {
            const response = await fetch(endpointUrl, request);
            return response.json();
        } catch (err) {
            throw err;
        }

    }

    async getCards() {
        return this.callApi(`${this.apiUrl}/getCards`);
    }
}