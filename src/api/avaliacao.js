import resolver from "../utils/resolver";
import Cookies from 'js-cookie';
import ServerException from "../utils/serverException";

export async function criarUmaAvaliacao(cabecalho, configuracoes, questoes) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': Cookies.get('token')
        },
        // Convertendo o objeto de dados em uma string JSON
        body: JSON.stringify({
            'cabecalho': cabecalho,
            'configuracoes': configuracoes,
            'questoes': questoes
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