import { useContext } from "react";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";
import TestConfigsForm from "./TestConfigsForm";

const ConfigsCreate = () => {

    const { currentCreateTest, dispatchCurrentCreateTest } = useContext(CurrentTestContext);

    return (
        <TestConfigsForm test={currentCreateTest} dispatch={dispatchCurrentCreateTest}/>
    );
}

export default ConfigsCreate;