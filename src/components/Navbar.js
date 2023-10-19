import { Link } from 'react-router-dom';
import useGet from '../hooks/useGet';
import { useState } from 'react';

const Navbar = () => {

    const [ submit, setSubmit ] = useState();

    const { data, isLoading, error } = useGet("http://localhost:8080/login/", submit);

    if(data) {
        window.location.href = data;
    } else if(error) {
        console.error(error);
    } 
   
    return (
        <nav className="navbar">
            <h1>Gerador</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/criar-questao"> Nova Questao</Link>
                 <button onClick={ () => setSubmit(true) }>Login</button>
            </div>
        </nav>
    )
}

export default Navbar;