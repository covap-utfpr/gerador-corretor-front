import ListaAvaliacoes from "../components/listas/ListaAvaliacoes";

const Home = () => {

    return (
        
        <main>
            <p>Seja bem vindo(a)!</p>
            <div className="modulo" id="avaliacoes">
                <ListaAvaliacoes />
            </div>
        </main>
    )
}

export default Home;