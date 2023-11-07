import { useEffect , useState } from "react";
import { readDiretorios } from "../api/diretorio";
import Cookies from "js-cookie";

const SelectDisciplinas = () => {

    const [ diretorios, setDiretorios ] = useState([]);

    useEffect(() => {

        async function fetchDiretorios() {

            const idDiretorioApp = Cookies.get("diretorioApp");

            const listaDiretorios = await readDiretorios(idDiretorioApp);
            
            if(listaDiretorios.data) {
        
                setDiretorios(listaDiretorios.data);
        
            } else if (listaDiretorios.error) {
        
                console.error(listaDiretorios.error);
            }   
        }

        fetchDiretorios();

    }, []);

    return (
        <div className="select-disciplinas">
            <h2>Disciplinas: </h2>
            <select name="disciplinas" id="disciplinas">
                {diretorios.map((diretorio, index) => (
                    <option key={index} value={diretorio.name}>
                    {diretorio.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectDisciplinas;