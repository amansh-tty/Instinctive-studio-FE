interface StudentState {
    students: any[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: StudentState = {
    students: [],
    loading: false,
    error: null,
  };
  
  export const studentReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'FETCH_STUDENTS_SUCCESS':
        return { ...state, students: action.payload, loading: false };
      case 'FETCH_STUDENTS_ERROR':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  