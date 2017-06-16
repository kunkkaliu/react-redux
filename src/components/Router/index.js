/**
 * Created by liudonghui on 17/6/10.
 */
class Router {
    constructor(routes) {
        this.routes = routes;
        this.subscriptions = [];
    }

    dispatch(routes) {
        this.routes = routes;
        for(let type in this.subscriptions) {
            this.subscriptions[type] && this.subscriptions[type].forEach(f => f());
        }
    }

    subscribe(type, callback) {
        if(!this.subscriptions[type]) {
            this.subscriptions[type] = [];
        }
        this.subscriptions[type].push(callback);
    }

    unsubscribe(type) {
        this.subscriptions[type] && (this.subscriptions[type] = null);
    }
}

export default Router;