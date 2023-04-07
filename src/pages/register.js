import React from 'react';
import { Context } from '../App';
import { useNavigate } from "react-router-dom";

function Register() {
    const { ctx, set_ctx } = React.useContext(Context);
    const navigate = useNavigate();
    
    const goToDoctorRegister = () => {
        navigate("/register/doctor");
    }

    const goToPatientRegister = () => {
        navigate("/register/patient");
    }

    React.useEffect(() => {
        if (ctx.status !== "authenticated") {
            navigate("/");
        }
    }, [ctx.status, navigate]);
    
    return (
        <div>
            <button type="button" class="btn btn-primary" onClick={goToDoctorRegister}>Doctor</button>
            <button type="button" class="btn btn-success" onClick={goToPatientRegister}>Patient</button>
        </div>
    );
}

export default Register;