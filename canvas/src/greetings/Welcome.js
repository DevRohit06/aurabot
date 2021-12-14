const Greeting = require("./Base");

module.exports = class Welcome extends Greeting {
    constructor() {
        super();
        this.textTitle = "WELCOME";
        this.textMessage = "Welcome to {server}";
        this.colorTitle = "#d5e0d8";
    }
};
