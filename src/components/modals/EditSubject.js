import { useContext, useState } from "react";
import { SubjectListContext } from "../../contexts/SubjectListContex";
import DirectoryCalls from "../../api/DirectoryCalls";
import ListItem from "../../models/ListItem";
import SubjectModal from "./SubjectModal";

const EditSubject = ( { setModal, id } ) => {

    const { dispatchSubjectList } = useContext(SubjectListContext);

    const [ name, setName ] = useState();

    async function handleSubmit(event) {

        event.preventDefault();

        const directoryCalls = new DirectoryCalls();

        let subjectId = await directoryCalls.updateDirectory({name: name, id: id});

        if(subjectId) {

            dispatchSubjectList( {
                type: 'updateSubject', 
                payload: new ListItem(subjectId.data, name)
            } );

        } else if (subjectId.error) {

            console.error("Erro ao criar disciplina");
        }
    }

    return (
        <SubjectModal 
        type={"Editar"}
        setModal={setModal}
        setName={setName}
        handleSubmit={handleSubmit} 
       />
    )
}

export default EditSubject;