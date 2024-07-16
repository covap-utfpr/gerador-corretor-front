import { useContext, useState } from "react";
import { QuestionListsContext } from "../../contexts/QuestionListsContext";
import { TestListsContext } from "../../contexts/TestListsContext";
import { SubjectListContext } from "../../contexts/SubjectListContex";
import { LoginContext } from "../../contexts/LoginContext";
import DirectoryCalls from "../../api/DirectoryCalls";

const SubjectModal = ( { setQuestionModal, props } ) => {

    const { rootDirectoryId } = useContext(LoginContext)
    const { dispatchQuestionLists } = useContext(QuestionListsContext);
    const { dispatchTestsLists } = useContext(TestListsContext);
    const { dispatchSubjectList } = useContext(SubjectListContext);

    const isEditMode = props.action === 'edit';

    const [ name, setName ] = useState();

    async function handleSubmit(event) {

        //impede recarregamento de pagina ao submeter formulario
        event.preventDefault();

        const directoryCalls = new DirectoryCalls();

        let subjectId;

        if(isEditMode) subjectId = await directoryCalls.updateDirectory({name: name, id: props.id});
        else subjectId = await directoryCalls.createDirectory({name: name, parent: rootDirectoryId});

        if(subjectId.data) {

            let idQuestionsDir, idTestsDir;

            if(!isEditMode) {
                [ idQuestionsDir, idTestsDir ] = await Promise.all([
                    directoryCalls.createDirectory({name:"Questoes", parent: subjectId.data}),
                    directoryCalls.createDirectory({name:"Avaliacoes", parent: subjectId.data}),
                ]);

                
            }
        
            if(idQuestionsDir.data && idTestsDir.data) {
                
                dispatchSubjectList(
                    {
                        type: 'addSubject', 
                        payload: {
                            name: name,
                            id: subjectId.data
                        }
                    }
                );
                
                dispatchQuestionLists(
                    {
                        type: 'add',
                        payload: {
                            subjectId: subjectId.data,
                            lista: [],
                            qnt: 0,
                        }
                    }
                )

                dispatchTestsLists(
                    {
                        type: 'adicionarLista',
                        payload: {
                            subjectId: subjectId.data,
                            lista: [],
                            qnt: 0,
                        }
                    }
                )
            } else if (idQuestionsDir.error || idTestsDir.error) {
        
                console.error("erro ao criar pastas internas");
            }

        } else if (subjectId.error) {

            console.error("Erro ao criar disciplina");
        }
    }

    function handleNomeChange(event) {
        
        setName(event.target.value);
    }

    return (
        <div className="modal">
            <h2>Nova Disciplina</h2>
            <div className="formulario-disciplina">
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="campo-form">
                        <label htmlFor="nome">Nome da Disciplina</label>
                        <input 
                            type="text"
                            name="nome"
                            id="nome"
                            required
                            onChange={(event) => handleNomeChange(event)}
                        />
                    </div>
                    <button className="enviar" type="submit">Enviar</button>
                    <button type="button" className="fechar" onClick={() => {setQuestionModal(false)}}>Fechar</button>
                </form>
            </div>
        </div>
    )
}

export default SubjectModal;