/** @odoo-module */

import {reactive} from "@odoo/owl";

class MoneyTrackerList {
    nextId = 1;
    trackers = [];

    constructor(trackers) {
        this.trackers = trackers || [];
        const taskIds = this.trackers.map((t) => t.id);
        this.nextId = taskIds.length ? Math.max(...taskIds) + 1 : 1;
    }

    addTracker({amount, note}) {
        if (amount) {
            const tracker = {
                id: this.nextId++,
                amount: parseInt(amount, 10),
                note,
                date: new Date().toLocaleString(),
            };
            this.trackers.push(tracker);
        }
    }

    deleteTracker(tracker) {
        const index = this.trackers.findIndex((t) => t.id === tracker.id);
        this.trackers.splice(index, 1);
    }

    editTracker(tracker) {
        tracker.amount = parseInt(tracker.amount, 10);
        const index = this.trackers.findIndex((t) => t.id === tracker.id);
        console.log(index);
        if (index !== -1) {
            this.trackers[index] = {...this.trackers[index], ...tracker};
        }
    }

    getTotal() {
        return this.trackers.map(tracker => tracker.amount).reduce((sum, amount) => sum + amount, 0);
    }

    getExpense() {
        return this.trackers
            .map(tracker => tracker.amount) // Map to an array of amounts
            .filter(amount => amount < 0)  // Filter to include only negative amounts
            .reduce((sum, amount) => sum + amount, 0); // Sum the negative amounts
    }

    getIncomes() {
        return this.trackers
            .map(tracker => tracker.amount) // Map to an array of amounts
            .filter(amount => amount > 0)  // Filter to include only negative amounts
            .reduce((sum, amount) => sum + amount, 0); // Sum the negative amounts
    }
}

export function createTaskStore() {
    const saveTasks = () => localStorage.setItem("money_tracker", JSON.stringify(trackerStore.trackers));
    const initialTackers = JSON.parse(localStorage.getItem("money_tracker") || "[]");
    const trackerStore = reactive(new MoneyTrackerList(initialTackers), saveTasks);
    saveTasks();
    return trackerStore;
}