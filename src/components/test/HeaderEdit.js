import { useContext } from "react";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";
import TestHeaderForm from "./TestHeaderForm";

const HeaderEdit = () => {
    
    const { currentEditTest, dispatchCurrentEditTest } = useContext(CurrentTestContext);

    return (
        <TestHeaderForm test={currentEditTest} dispatch={dispatchCurrentEditTest}/>
    );
}

export default HeaderEdit;