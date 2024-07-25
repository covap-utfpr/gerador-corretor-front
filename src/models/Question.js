class Question {
    
    constructor(subjectId, title, stem, alternatives, picture, correct) {

        this.subjectId = subjectId;
        this.title = title;
        this.stem = stem;
        this.picture = picture;
        this.alternatives = alternatives;
        this.correct = correct;
    }
}

export default Question;

