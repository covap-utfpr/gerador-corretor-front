import resolve from "../utils/resolver";
import Cookies from 'js-cookie';
import ServerException from "../utils/serverException";

// chamadas de API para arquivos 
// OBS: params sao sempre objetos
export default class FileCalls {

    // recebe tipo de arquivo: test ou question
    constructor(type) {
        this.type = type === 'test' ? 'avaliacao' : 'questao';
        // url para a rota backend
        this.server = `http://localhost:8080/${this.type}`;
        // url completa com parametros
        this.url = "";
        // segundo parametro de fetch, definiçao de metodo, headers e body
        this.requestOptions = {
            method: '',
            headers: {
                'Content-Type': '', 
                'Authorization': Cookies.get('token')
            },
            body: null, 
        };
    }
    
    // cria um arquivo 
    // params de question:
        // subject - disciplina
        // title - titulo
        // stem - enunciado
        // alternatives 
        // piscture
        // correct
        // parent - id da disciplina
    // params de test:
        //
    async createFile(params) {

        this.url = `${this.server}/criar`;
        this.requestOptions.method = 'POST';
        this.requestOptions.headers['Content-Type'] = 'application/json';

        //deve receber parametro parent (id da disciplina)
        this.requestOptions.body = JSON.stringify(params);

        //recebe id da questao criada
        return await this.fetchFunction('text');
    }
    
    //Problema: arrumat parametros recebido do json
    // params: 
    //question 
        // subject - disciplina
        // title - titulo
        // stem - enunciado
        // alternatives 
        // picture
        // correct
        // parent - id da disciplina
    // id
    async updateFile(params) {

        this.url = `${this.server}/editar`;
        this.requestOptions.method = 'PUT';
        this.requestOptions.headers['Content-Type'] = 'application/json';

        this.requestOptions.body = JSON.stringify(params);

        //recebe id da questao editada
        return await this.fetchFunction('text');
    }

    // obtém um arquivo de avaliacao ou questao
    // params:
        // id da questao
    async readFile(params) {

        this.url = `${this.server}/ler/${params['id']}`;
        this.requestOptions.method = 'GET';
        this.requestOptions.headers['Content-Type'] = 'application/json';

        // recebe arquivo json
        return await this.fetchFunction('json');
    }

    // obtém objeto com o id da disciplina, quantidade de questoes e lista de questoes. 
    // Cada questao é um objeto com nome e id
    // params: 
        // parentId: id da disciplina
        // quantidade: tamanho da pagina de diretorios
        // inicial: indice inicial de busca nos diretorios
    async readFiles(params) {

        this.url = `${this.server}/ler?parentId=${params['parentId']}&qnt=10&start=${params['start']}`;
        this.requestOptions.method = 'GET';
        this.requestOptions.headers['Content-Type'] = 'application/json';

        return await this.fetchFunction('json');
    }

    // deleta arquivo
    async deleteFile(params) {
        this.url = `${this.server}/deletar/${params['id']}`;
        this.requestOptions.method = 'DELETE';
        this.requestOptions.headers['Content-Type'] = 'text/html';

        //recebe id do arquivo deletado
        return await this.fetchFunction('text');
    }

    async fetchFunction(responseType) {

        return await resolve(fetch(this.url, this.requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw new ServerException(res.statusText, res.status);
            }
            
            return responseType == 'text' ? res.text(): res.json();
        })
    )
    }
}