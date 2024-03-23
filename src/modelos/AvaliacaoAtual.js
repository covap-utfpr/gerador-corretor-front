import CabecalhoAvaliacao from "./CabecalhoAvalicao";
import ConfiguracoesAvaliacao from "./ConfiguracoesAvaliacao";

class AvaliacaoAtual {
    
    constructor(titulo, instituicao, disciplina, data, instrucoes, valor, disposicao, gabarito, fonte, tamanhoFonte, espaco) {

        this.questoes = [];
        this.cabecalho = new CabecalhoAvaliacao(titulo, instituicao, disciplina, data, instrucoes, valor);
        this.configuracoes = new ConfiguracoesAvaliacao(disposicao, gabarito, fonte, tamanhoFonte, espaco);
    };

}

export default AvaliacaoAtual;
