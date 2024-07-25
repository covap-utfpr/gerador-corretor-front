import FileCalls from "../api/FileCalls";
import FileList from "../models/FileList";

const requestLists = async (subjectList, type) => {

    const fileCalls = new FileCalls(type);

    const listsPromises = subjectList.map( async (subject) => {

        const res = await fileCalls.readFiles({parentId: subject.id, start: 0});

        if(res.data) {

            const list = new FileList(subject.id, res.data.length, res.data);
            return list;

        } else if (res.error) {

            const list = new FileList(subject.id, 0, []);
            return list;
        } 
    });

    const lists = await Promise.all(listsPromises);
    
    const filtered = lists.filter(list => list !== undefined);

    return filtered;
}

export default requestLists;