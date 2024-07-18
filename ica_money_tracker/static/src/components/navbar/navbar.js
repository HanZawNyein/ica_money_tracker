/** @odoo-module */
import {Component, onRendered, useState} from "@odoo/owl";

export class NavbarComponent extends Component {
    static template = "ica_money_tracker.navbar_component";
    static props = {};

    setup() {
        this.state = useState({
            connectivity: 'online'
        });
        onRendered(() => {
            window.addEventListener('online', () => this.updateOnlineStatus());
            window.addEventListener('offline', () => this.updateOnlineStatus());
        })
    }

    updateOnlineStatus() {
        if (navigator.onLine) {
            this.state.connectivity = 'online';
            // synchronizeData();
        } else {
            this.state.connectivity = 'offline';
        }
    }
}
