import resolve from "../utils/resolver";
import Cookies from 'js-cookie';
import ServerException from "../utils/serverException";

// chamadas de API para Diretorio
// OBS: params sao sempre objetos
export default class DirectoryCalls {

    constructor() {

        // url para a rota backend
        this.server = 'http://localhost:8080/diretorio';
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
  
    // cria um diretorio no drive
    // params: 
        // name - nome do arquivo
        // parent - id do diretorio pai
    async createDirectory({ name, parentId }) {
        
        this.url = `${this.server}/criar`;
        this.requestOptions.method = 'POST';
        this.requestOptions.headers['Content-Type'] = 'application/json';
        // pode receber parametro parent (id do diretorio raiz) ou nao
        console.log( name, parentId );
        this.requestOptions.body = JSON.stringify({ name, parentId });

        // recebe id do diretorio criado
        return await this.fetchFunction('text');
    }

    //Problema: arrumar parametros recebido do json
    // params: name, id
    async updateDirectory({ name, id, parentId }) {

        this.url = `${this.server}/editar`;
        this.requestOptions.method = 'PUT';
        this.requestOptions.headers['Content-Type'] = 'application/json';

        // deve receber parametro parent (id da disciplina)
        this.requestOptions.body = JSON.stringify({ name, id, parentId });

        // recebe id do diretorio editado
        return await this.fetchFunction('text');
    }

    // obtém o id do diretorio com o nome especificado
    // params: 
        // name 
        // parentId: id do diretorio pai
    async readDirectoryId({ name, parentId }) {

        this.url = `${this.server}/ler/${name}?parentId=${parentId}`;
        this.requestOptions.method = 'GET';
        this.requestOptions.headers['Content-Type'] = 'text/html';

        // recebe id do diretorio solicitado
        return await this.fetchFunction('text');
    }

    // obtém lista de objetos, cada um com nome e id do diretorio
    // params: 
        // parentId: id do diretorio pai
        // quantidade: tamanho da pagina de diretorios
        // inicial: indice inicial de busca nos diretorios
    async readDirectories({ parentId, start = 0 }) {

        this.url = `${this.server}/ler?parentId=${parentId}&qnt=50&start=${start}`;
        this.requestOptions.method = 'GET';
        this.requestOptions.headers['Content-Type'] = 'application/json';

        // recebe lista solicitada
        return await this.fetchFunction('json');
    }

    // deleta diretorio
    async deleteDirectory({ id }) {
        this.url = `${this.server}/deletar/${id}`;
        this.requestOptions.method = 'DELETE';
        this.requestOptions.headers['Content-Type'] = 'text/html';

        // recebe id do diretorio deletado
        return await this.fetchFunction('text');
    }

    // realiza açao assincrona de chamada de api
    async fetchFunction(responseType) {
        return await resolve(
            fetch(this.url, this.requestOptions)
                .then(res => {
                    if (!res.ok) {
                        throw new ServerException(res.statusText, res.status);
                    }
                    return responseType === 'text' ? res.text() : res.json();
                })
        );
    }
}
