import { useState } from 'react';
import { Link } from 'react-router-dom';
//import useFetch from '../useFetch';

const Navbar = () => {

    const [ clicks, setClicks ] = useState(false);
    const [ data, setData ] = useState("");
    const [ error, setError ] = useState("");

    //const { data, isLoading, error} = useFetch("http://localhost:8080/login/", {} , clicks);
    fetch("http://localhost:8080/login/")
        .then(res => {
            if(!res.ok) {
                throw Error("could not fetch the data");
            }
            return res.text();
        })
        .then(data => {
            setData(data);
            setError(null);
        }) 
        .catch(err => {

            if(err.name === 'AbortError') {
                console.log("fetch aborted");
            } else {
                setError(err.message);
            }
        });

    return (
        <nav className="navbar">
            <h1>Gerador</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/criar-questao"> Nova Questao</Link>
                 <button onClick={() => setClicks(true)}>Login</button>
                 {error && <div>{error}</div>}
                 {data && <div>{data}</div>}
            </div>
        </nav>
    )
}

export default Navbar;