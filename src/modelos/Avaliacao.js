
class Avaliacao {
    
    constructor(tipo, titulo, imagem, data, instituicao, instrucoes, questoes) {

        this.tipo = tipo;
        this.titulo = titulo;
        this.imagem = imagem;
        this.data = data;
        this.instituicao = instituicao;
        this.questoes = questoes; 
        this.instrucoes = instrucoes;
        this.planilha;
    }

}

export default Avaliacao;
