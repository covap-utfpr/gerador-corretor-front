import resolver from "./resolver";

export async function postDiretorio(nome) {
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        // Convertendo o objeto de dados em uma string JSON
        body: JSON.stringify({
            'nome': nome,
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
