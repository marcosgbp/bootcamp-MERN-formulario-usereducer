import React, { useReducer } from "react";

function Form() {
    const initialState = {
        firstName: {
            value: "",
            error: null,
        },
        lastName: {
            value: "",
            error: null,
        },
        email: {
            value: "",
            error: null,
        },
        };
  const [state, dispatch] = useReducer(formReducer, initialState);

  
  function formReducer(state, action){
    console.log(action)
    let errorAux = null;
    let mailformat  = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(action.type=="firstName" && action.payload.length<3 && action.payload.length>0) errorAux = "El nombre debe de ser más largo";
    if(action.type=="lastName" && action.payload.length<3 && action.payload.length>0) errorAux = "El Apellido debe de ser más largo";
    if(action.type=="email" && !mailformat.test(action.payload) && action.payload.length>0) errorAux="Introduce un correo valido"
    return {
        ...state,
        [action.type]:{value:action.payload.value, error:errorAux}
    }
}
    function adminForm(evento){
        const {name, value} = evento.target;
        dispatch({
            type:name,
            payload:value
        })
    }
  return (
    <div className="container mt-3">
      <form>
        <div className="row mb-3">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            Nombre:
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="firstName"
            onChange={adminForm} />
            {state.firstName.error !== null && (
                <p className="text-danger">{state.firstName.error}</p>
             )}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">
            Apellido:
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="lastName" 
            onChange={adminForm}/>
                        {state.lastName.error !== null && (
                <p className="text-danger">{state.lastName.error}</p>
              )}
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email:
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="email" 
            onChange={adminForm}/>
                                  {state.email.error !== null && (
                <p className="text-danger">{state.email.error}</p>
              )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Form;
