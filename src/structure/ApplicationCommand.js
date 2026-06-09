class ApplicationCommand {
    data;

    constructor(structure) {
        this.data = {
            __type__: 1,
            ...structure
        }
    }

    toJSON = () => {
        return { ...this.data }
    }
}

module.exports = ApplicationCommand;
