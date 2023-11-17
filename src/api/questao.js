import resolver from "../utils/resolver";
import Cookies from 'js-cookie';
import ServerException from "../utils/serverException";

export async function criarUmaQuestao(titulo, enunciado, imagem, disciplina) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': Cookies.get('token')
        },
        // Convertendo o objeto de dados em uma string JSON
        body: JSON.stringify({
            'titulo': titulo,
            'enunciado': enunciado,
            'imagem': imagem,
            'disciplina': disciplina
        }), 
    };

    return await resolver(fetch("http://localhost:8080/questao/criar", requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw new ServerException(res.statusText, res.status);
            }
            
            return res.text();
        })
    )
}

export async function lerVariasQuestoes(disciplina, diretorioRaiz) {
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': Cookies.get('token')
        },
    };

    return await resolver(fetch(`http://localhost:8080/questao/ler?disciplina=${disciplina}&diretorioRaiz=${diretorioRaiz}`, requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw new ServerException(res.statusText, res.status);
            }
            return res.json();
        })
    )
}