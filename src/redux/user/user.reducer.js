
const INITIAL_STATE = {
  currentUser : null,
};

//default State 설정하는 방법 
const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case 'SET_CURRENT_USER' : 
      return {
        ...state,
        currentUser : action.payload
      }
    default : 
      return state;
  }
}

export default userReducer;