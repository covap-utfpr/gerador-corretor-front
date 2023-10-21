import resolver from "./resolver";

export async function getUrlLogin() {
    
    return await resolver(fetch("http://localhost:8080/login/")
        
        .then(res => {
            
            if(!res.ok) {
                throw Error("Nao foi possivel recuperar url de login");
            }
            
            return res.text();
        })
    )
}
