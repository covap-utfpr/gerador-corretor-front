import { useContext } from "react";
import { GlobalContext } from "../globals/Global";

const MensagemConfirmacao = () => {

    const { mensagem, setMensagem } = useContext(GlobalContext);

    setTimeout(() => {
        setMensagem(false);
    }, 3000);

    return (
        <p className="modal">Sua {mensagem.entidade} foi {mensagem.acao} com sucesso.</p>
    )
}

export default MensagemConfirmacao;