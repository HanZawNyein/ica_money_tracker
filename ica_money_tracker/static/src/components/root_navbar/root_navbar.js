/** @odoo-module */
import {Component, onRendered, useState} from "@odoo/owl";
import {useStore} from "../../store";

export class RootNavbarComponent extends Component {
    static template = "ica_money_tracker.root_navbar_component";
    static props = {};

    setup() {
        // this.state = useState({
        //     connectivity: 'online'
        // });
        this.store = useStore();
        onRendered(() => {
            window.addEventListener('online', () => this.updateOnlineStatus());
            window.addEventListener('offline', () => this.updateOnlineStatus());
        })
    }

    async updateOnlineStatus() {
        if (navigator.onLine) {
            this.store.connectivity = 'online';
            // synchronizeData();
            await this.syncData();
        } else {
            this.store.connectivity = 'offline';
            console.log("you are offline.")
        }
    }

    async syncData() {
        // console.log("push to database from local if online")
        // push to database after online
        // this.env.store.trackers
        if (this.env.store.trackers) {
            this.env.store.trackers = [];
            // pull from database
            this.env.store.nexId = 1
            this.env.store.trackers = [
                {id: 1, amount: 100, note: "Buying Something!"},
                {id: 2, amount: 200, note: "Buying Something!"},
                {id: 3, amount: -300, note: "Buying Something!"},
            ]
            console.log("pull from database successfully.")
        }

    }
}
