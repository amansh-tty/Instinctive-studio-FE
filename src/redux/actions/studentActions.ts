import { supabase } from '../../supabase/supabaseClient';

export const fetchStudents = () => async (dispatch: any) => {
  try {
    const { data, error } = await supabase
      .from('students')   
      .select('student_name, cohort, courses, date_joined, last_login, status'); 
    
    if (error) throw error;

    dispatch({
      type: 'FETCH_STUDENTS_SUCCESS',
      payload: data,
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error  
        ? err.message        
        : 'An unknown error occurred'; 

    dispatch({
      type: 'FETCH_STUDENTS_ERROR',
      payload: errorMessage,  
    });

    console.error('Error fetching students:', errorMessage); 
  }
};
