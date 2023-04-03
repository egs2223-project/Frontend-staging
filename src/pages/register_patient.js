import React from 'react';
import { Context } from '../App';
import { useNavigate } from "react-router-dom";

function RegisterPatient() {
    const { ctx, set_ctx } = React.useContext(Context);
    const [state, set_state] = React.useState(
    {
        email: '',
        name: '',
        date_of_birth: '',
        phone_number: '',
        address: '',
        city: '',
        region: '',
        postal_code: '',
        country: '',
        patient_code: '',
        notification_preferences: {
            email: false,
            sms: false
        }
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        console.log(event);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        set_state({...state,
            [name]: value
        });
    }

    const handlePreferencesInputChange = (event) => {
        console.log(event);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name.replace('notification_preferences.', '');
        var partialState = { "notification_preferences": state.notification_preferences };
        partialState["notification_preferences"][name] = value;
        set_state({...state, partialState});
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        postPatient();
    }

    const handleCancel = () => {
        navigate("/register");
    }

    const postPatient = () => {
        // clone state and remove extra fields
        const requestBodyPatient = {
            id: '00000000-0000-0000-0000-000000000000',
            ...state
        };

        fetch("/v1/patients/", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBodyPatient)
        }).then(response => {
            console.log(response.status);
            if (response.status == 201) {
                set_ctx({...ctx, status: "registered"});
                navigate("/");
            }
            else if (response.status == 403) {
                alert("You need to use the same email you used to loggin externally");
            } else if (response.status == 409) {
                alert("This email is already registered");
            } else {
                alert(`This was an unexpected problem. You should debug this.`);
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp"
                        name="email" checked={state.email} onChange={handleInputChange}></input>
                </div>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name"
                        name="name" checked={state.name} onChange={handleInputChange}></input>
                </div>
                <div class="mb-3">
                    <label for="dob" class="form-label">Date of Birth</label>
                    <input type="text" class="form-control" id="dob"
                        name="date_of_birth" checked={state.date_of_birth} onChange={handleInputChange}></input>
                    <div id="dobHelp" class="form-text">Example: 2023-03-27T16:17:19.932Z</div>
                </div>
                <div class="mb-3">
                    <label for="phoneNumber" class="form-label">Phone Number</label>
                    <input type="text" class="form-control" id="phoneNumber"
                        name="phone_number" checked={state.phone_number} onChange={handleInputChange}></input>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Address</label>
                    <input type="text" class="form-control" id="address"
                        name="address" checked={state.address} onChange={handleInputChange}></input>
                </div>
                <div class="mb-3">
                    <label for="city" class="form-label">City</label>
                    <input type="text" class="form-control" id="city"
                        name="city" checked={state.city} onChange={handleInputChange}></input>
                </div>
                <div class="mb-3">
                    <label for="region" class="form-label">Region</label>
                    <input type="text" class="form-control" id="region"
                        name="region" checked={state.region} onChange={handleInputChange}></input>
                </div>
                <div class="mb-3">
                    <label for="postal_code" class="form-label">Postal Code</label>
                    <input type="text" class="form-control" id="postal_code"
                        name="postal_code" checked={state.postal_code} onChange={handleInputChange}></input>
                </div>
                <div class="mb-3">
                    <label for="country" class="form-label">Country</label>
                    <input type="text" class="form-control" id="country"
                        name="country" checked={state.country} onChange={handleInputChange}></input>
                </div>
                <div class="mb-3">
                    <label for="patient_code" class="form-label">SNS Number</label>
                    <input type="text" class="form-control" id="patient_code"
                        name="patient_code" checked={state.patient_code} onChange={handleInputChange}></input>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="sms_notifications"
                        name="notification_preferences.sms" checked={state.notification_preferences.sms} onChange={handlePreferencesInputChange}></input>
                    <label class="form-check-label" for="sms_notifications">
                        SMS notifications
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="email_notifications"
                        name="notification_preferences.email" checked={state.notification_preferences.email} onChange={handlePreferencesInputChange}></input>
                    <label class="form-check-label" for="email_notifications">
                        E-mail notifications
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-danger" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default RegisterPatient;