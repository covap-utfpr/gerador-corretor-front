import resolver from "../utils/resolver";
import ServerException from "../utils/serverException";

export async function getUrlLogin() {
    
    return await resolver(fetch("http://localhost:8080/login/")
        
        .then(res => {
            
            if(!res.ok) {
                console.log(res)
                throw new ServerException(res, res.status);
            }
            
            return res.text();
        })
    )
}

