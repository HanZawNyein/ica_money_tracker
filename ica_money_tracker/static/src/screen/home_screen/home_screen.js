/** @odoo-module */
import {Component, onMounted, useRef, useState} from "@odoo/owl";
import {NavbarComponent} from "../../components/navbar/navbar";
import {useStore} from "../../store";

export class HomeScreen extends Component {
    static template = "ica_money_tracker.home_screen";
    static props = {};
    static components = {NavbarComponent};

    setup() {
        this.valueRef = useRef('value');
        this.noteRef = useRef('note');
        this.state = useState({
            tracker: null,
        })
        this.store = useStore();
        onMounted(() => this.valueRef.el.focus());
    }

    clickNumpad(control_button) {
        if (control_button === 'cancel') {
            this.valueRef.el.value = '';
        } else {
            this.valueRef.el.value += control_button;
        }
    }

    clickIncomes() {
        this.addTracker();
    }

    clickExpenses() {
        if (this.valueRef.el.value) {
            this.valueRef.el.value = `-${this.valueRef.el.value}`;
        }
        this.addTracker();
    }

    addTracker() {
        if (this.valueRef.el.value) {
            this.store.addTracker({'amount': this.valueRef.el.value, 'note': this.noteRef.el.value});
            this.valueRef.el.value = '';
            this.noteRef.el.value = '';
        }
    }

    toEditTracker(tracker) {
        this.valueRef.el.value = tracker.amount;
        this.noteRef.el.value = tracker.note;
        this.state.tracker = tracker;
    }

    editTracker() {
        this.state.tracker = {id: this.state.tracker.id, amount: this.valueRef.el.value, note: this.noteRef.el.value};
        this.valueRef.el.value = '';
        this.noteRef.el.value = '';
        this.store.editTracker(this.state.tracker);
        this.cancelTracker()
    }

    deleteTracker(tracker) {
        this.store.deleteTracker(tracker);
    }

    cancelTracker() {
        this.state.tracker = null;
        this.valueRef.el.value = '';
        this.noteRef.el.value = '';
    }

}
