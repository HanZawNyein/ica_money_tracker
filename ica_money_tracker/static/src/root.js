/** @odoo-module */
import {Component, useSubEnv} from "@odoo/owl";
import {HomeScreen} from "./screen/home_screen/home_screen";
import {RootNavbarComponent} from "./components/root_navbar/root_navbar";
import {createTaskStore} from "./models/money_tracker";

export class Root extends Component {
    static template = "ica_money_tracker.Root";
    static props = {};
    static components = {RootNavbarComponent, HomeScreen};

    setup() {
        useSubEnv({store: createTaskStore()}); // myKey is now available for all child components
    }
}
