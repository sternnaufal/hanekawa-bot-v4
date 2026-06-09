class Component {
    data;

    constructor(structure) {
        this.data = {
            __type__: 3,
            ...structure
        }
    }

    toJSON = () => {
        return { ...this.data }
    }
}

module.exports = Component;
