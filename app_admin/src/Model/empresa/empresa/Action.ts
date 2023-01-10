import { SAction } from "servisofts-model";
export default class Action extends SAction {

    getSelect() {
        var data = super.getAll();
        if (!data) return null;
        if (Object.values(data).length > 0) {
            return Object.values(data)[0];
        }
        return null;
    }
}