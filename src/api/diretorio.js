import resolver from "../utils/resolver";
import Cookies from 'js-cookie';
import ServerException from "../utils/serverException";

export async function criarUmDiretorio(nome, pai) {
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': Cookies.get('token')
        },
        // Convertendo o objeto de dados em uma string JSON
        body: JSON.stringify({
            'nome': nome,
            'pai': pai
        }), 
    };

    return await resolver(fetch("http://localhost:8080/diretorio/criar", requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw new ServerException(res.statusText, res.status);
            }
            
            return res.text();
        })
    )
}

export async function lerUmDiretorio(nome, pai) {
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': Cookies.get('token')
        },
    };

    return await resolver(fetch(`http://localhost:8080/diretorio/ler/${nome}?IDdiretorioPai=${pai}`, requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw new ServerException(res.statusText, res.status);
            }
            
            return res.text();
        })
    )
}

export async function lerVariosDiretorios(pai, inicial) {
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': Cookies.get('token')
        },
    };

    return await resolver(fetch(`http://localhost:8080/diretorio/ler?IDdiretorioPai=${pai}&quantidade=50&inicial=${inicial}`, requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw new ServerException(res.statusText, res.status);
            }
            return res.json();
        })
    )
}

