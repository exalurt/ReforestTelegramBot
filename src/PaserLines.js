const ProfileAgent = require("./ProfileAgent");

const NAME = 2;
const LEVEL = 3;
const AP = 4;

module.exports = class PaserLines {

    constructor(reto){
        this.reto = reto;
    }

    scannerLine(strArray) {
        const agent = new ProfileAgent();

        agent.name = strArray[NAME];
        agent.reto = this.reto;
        agent.level = strArray[LEVEL];
        agent.ap = strArray[AP];

        for(let i in strArray) {
            agent.setData(strArray[i]);
        }
        return agent;
    }
}
