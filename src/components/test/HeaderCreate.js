import { useContext} from "react";
import { CurrentTestContext } from "../../contexts/CurrentTestContext";
import TestHeaderForm from "./TestHeaderForm";

const HeaderCreate = () => {

    const { currentCreateTest, dispatchCurrentCreateTest } = useContext(CurrentTestContext);

    return (
        <TestHeaderForm test={currentCreateTest} dispatch={dispatchCurrentCreateTest}/>
    );
}

export default HeaderCreate;