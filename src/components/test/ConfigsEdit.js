import { useContext } from "react";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";
import TestConfigsForm from "./TestConfigsForm";

const ConfigsEdit = () => {

    const { currentEditTest, dispatchCurrentEditTest } = useContext(CurrentTestContext);

    return (
        <TestConfigsForm test={currentEditTest} dispatch={dispatchCurrentEditTest}/>
    );
}

export default ConfigsEdit;