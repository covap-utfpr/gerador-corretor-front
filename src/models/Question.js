class Question {
    
    constructor(subjectId, title, stem, alternatives, imagem, correct) {

        this.subjectId = subjectId;
        this.title = title;
        this.stem = stem;
        this.imagem = imagem;
        this.alternatives = alternatives;
        this.correct = correct;
    }
}

export default Question;

