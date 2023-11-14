import resolver from "../utils/resolver";
import Cookies from 'js-cookie';

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
                throw Error("Nao foi possivel criar diretorio");
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

    return await resolver(fetch(`http://localhost:8080/diretorio/ler/${nome}?pai=${pai}`, requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw Error("Nao foi possivel ler diretorio");
            }
            
            return res.text();
        })
    )
}

export async function lerVariosDiretorios(pai) {
    
    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': Cookies.get('token')
        },
    };

    return await resolver(fetch(`http://localhost:8080/diretorio/ler?pai=${pai}`, requestOptions)
        
        .then(res => {
            
            if(!res.ok) {
                throw Error("Nao foi possivel ler diretorio");
            }
            return res.json();
        })
    )
}