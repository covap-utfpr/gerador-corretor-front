
class SubjectListStorage {

  storageKey;

  constructor() {

      this.storageKey = "subjectList";
      this.baseValue = [];
  }

  reducer = ( state, action ) => {
    
    switch (action.type) {
  
        case 'updateStorage':
            
          return this.updateStorage(action);
  
        case 'addSubject':
  
          return this.addSubject(action, state);

        case 'deleteSubject': 

          return this.deleteSubject(action, state);
          
        case 'deleteStorage': 

          return this.deleteStorage();

        default:    
          return state;
    }
  
  }

  //Setters
  updateStorage = ( action ) => {
    
    localStorage.setItem(this.storageKey, JSON.stringify(action.payload));
    return action.payload;
  }

  addSubject = (action, state) => {
      
    localStorage.setItem(this.storageKey, JSON.stringify([...state, action.payload]));      
    return [...state, action.payload];
  }

  deleteSubject = (action, state) => {

    const newState = [...state]; 
    const index = newState.findIndex(subject => subject.id == action.payload);

    newState.splice(index, 1);

    localStorage.setItem(this.storageKey, JSON.stringify(newState));

    return newState;
  }

  deleteStorage = () => {

    localStorage.setItem(this.storageKey, JSON.stringify(this.baseValue));
    return this.baseValue;
  }

  //Getters
    
    getBaseValue = () => {
          
      const storage = JSON.parse(localStorage.getItem(this.storageKey));
      return storage ? storage : this.baseValue;
    }

    getSubjectName = (state, subjectId) => {

      const subject = state.find(subject => subject.id == subjectId);
      return subject.name;
    }
}

export default SubjectListStorage;

