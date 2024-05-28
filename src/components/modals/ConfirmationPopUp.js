
//props = {type, action}
const ConfirmationPopUp = ({ setConfirmationPopUp, props }) => {

    let type, action;

    if(props.type == 'question')
        type = 'questao'
    else if (props.type == 'test')
        type = 'avaliaçao'
    else if (props.type == 'subject')
        type = 'disciplina'

    if(props.action == 'delete')
        action = 'deletada'
    else if (props.action == 'create')
        action = 'criada'
    else if (props.action == 'edit')
        action = 'editada'

    setTimeout(() => {
        setConfirmationPopUp(false);
    }, 3000);

    return (
        <p className="modal">Sua {type} foi {action} com sucesso.</p>
    )
}

export default ConfirmationPopUp;