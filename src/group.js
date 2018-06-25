export default class Group {

    constructor(name) {
        this.id = Group.count++;
        this.name = name;
        this.tabs = [];
    }

    addTab() {}

}

Group.count = 1;