import TestHeader from "./TestHeader";
import TestConfigs from "./TestConfigs";

class CurrentTest {
    
    constructor(title, institution, subject, date, instructions, value, order, answCardPosition, font, fontSize, lines) {

        this.questions = [];
        this.header = new TestHeader(title, institution, subject, date, instructions, value);
        this.configs = new TestConfigs(order, answCardPosition, font, fontSize, lines);
    };

}

export default CurrentTest;
