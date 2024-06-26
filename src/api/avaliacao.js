import resolver from "../utils/resolver";
import Cookies from 'js-cookie';
import ServerException from "../utils/serverException";

export async function criarUmaAvaliacao(questoes, cabecalho, configuracoes) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': Cookies.get('token')
        },
        // Convertendo o objeto de dados em uma string JSON
        body: JSON.stringify({
            'questoes': questoes, 
            'cabecalho': cabecalho, 
            'configuracoes': configuracoes
        }), 
    };

    return await resolver(fetch("http://localhost:8080/avaliacao/criar", requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw new ServerException(res.statusText, res.status);
            }
            
            return res.text();
        })
    )
}


export async function lerVariasAvaliacoes(idDisciplina, inicial) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': Cookies.get('token')
        },
    };

    return await resolver(fetch(`http://localhost:8080/avaliacao/ler?idDisciplina=${idDisciplina}&quantidade=10&inicial=${inicial}`, requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw new ServerException(res.statusText, res.status);
            }
            return res.json();
        })
    )
}

export async function deletarUmaAvaliacao(id, pai) {
    
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Authorization': Cookies.get('token')
        },
    };

    return await resolver(fetch(`http://localhost:8080/avaliacao/deletar/${id}?IDdiretorioPai=${pai}`, requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw new ServerException(res.statusText, res.status);
            }
            
            return res.text();
        })
    )
}