import resolver from "./resolver";
import Cookies from 'js-cookie';

export async function postQuestao(titulo, enunciado, imagem, diretorio) {

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
            'diretorio': diretorio
        }), 
    };

    return await resolver(fetch("http://localhost:8080/questao/criar", requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw Error("Nao foi possivel criar questao");
            }
            
            return res.text();
        })
    )
}
