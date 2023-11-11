function Button({buttonName, onCklickFunction}){

    return ( 
        <button type="button" className="btn btn-secondary" onClick={onCklickFunction}>
            {buttonName}
        </button> 
    );
}
export default Button;
