import resolver from "../utils/resolver";
import Cookies from 'js-cookie';
import ServerException from "../utils/serverException";

export async function criarUmaQuestao(idDisciplina, titulo, enunciado, alternativas, imagem, correta) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': Cookies.get('token')
        },
        // Convertendo o objeto de dados em uma string JSON
        body: JSON.stringify(
            {
                'idDisciplina': idDisciplina,
                'titulo': titulo,
                'enunciado': enunciado,
                'alternativas': alternativas,
                'imagem': imagem,
                'correta': correta,
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

export async function lerVariasQuestoes(idDisciplina, inicial) {
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': Cookies.get('token')
        },
    };

    return await resolver(fetch(`http://localhost:8080/questao/ler?idDisciplina=${idDisciplina}&quantidade=10&inicial=${inicial}`, requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw new ServerException(res.statusText, res.status);
            }
            return res.json();
        })
    )
}

export async function deletarUmaQuestao(id, pai) {
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': Cookies.get('token')
        },
    };

    return await resolver(fetch(`http://localhost:8080/questao/deletar/${id}?IDdiretorioPai=${pai}`, requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw new ServerException(res.statusText, res.status);
            }
            
            return res.text();
        })
    )
}