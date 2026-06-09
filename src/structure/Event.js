class Event {
    data;

    constructor(structure) {
        this.data = {
            __type__: 5,
            ...structure
        }
    }

    toJSON = () => {
        return { ...this.data }
    }
}

module.exports = Event;
