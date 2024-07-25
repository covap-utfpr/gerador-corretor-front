
const SubjectModal = ( { type, setModal, setName, handleSubmit } ) => {

    return (
        <div className="modal">
            <h2>{type} Disciplina</h2>
            <div className="formulario-disciplina">
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="campo-form">
                        <label htmlFor="nome">Nome da Disciplina</label>
                        <input 
                            type="text"
                            name="nome"
                            id="nome"
                            required
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <button className="enviar" type="submit">Enviar</button>
                    <button type="button" className="fechar" onClick={() => {setModal(false)}}>Fechar</button>
                </form>
            </div>
        </div>
    )
}

export default SubjectModal;