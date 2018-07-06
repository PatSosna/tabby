export default class Group {
    constructor(name) {
        this.id = Group.count++;
        this.name = name;
        this.tabs = [];
    }
}

Group.count = 1;