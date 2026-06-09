class MessageCommand {
    data;

    constructor(structure) {
        this.data = {
            __type__: 2,
            ...structure
        }
    }

    toJSON = () => {
        return { ...this.data }
    }
}

module.exports = MessageCommand;
