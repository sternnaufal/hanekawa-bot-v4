class AutocompleteComponent {
    data;

    constructor(structure) {
        this.data = {
            __type__: 4,
            ...structure
        }
    }

    toJSON = () => {
        return { ...this.data }
    }
}

module.exports = AutocompleteComponent;
