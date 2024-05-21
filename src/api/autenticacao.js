import resolver from "../utils/resolver";
import Cookies from 'js-cookie';
import ServerException from "../utils/serverException";

export async function getUrlLogin() {
    
    return await resolver(fetch("http://localhost:8080/login/")
        
        .then(res => {
            console.log(res)
            if(!res.ok) {
                throw new ServerException(res, res.status);
            }
            
            return res.text();
        })
    )
}

export async function logout() {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': Cookies.get('token')
        },
    };

    return await resolver(fetch("http://localhost:8080/logout/", requestOptions)
        
        .then(res => {

            if(!res.ok) {
                throw new ServerException(res, res.status);
            }
            
            return res.text();
        })
    )
}