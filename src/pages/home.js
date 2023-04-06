import React from 'react';
import { Context } from '../App';
import { useNavigate } from "react-router-dom";
import Appointments from './appointments';

function Home() {
    const { ctx, set_ctx } = React.useContext(Context);
    const navigate = useNavigate();
    
    console.log("Home context status: " + ctx.status);

    if (ctx.status === "uninitialized") {
        loadUser(ctx, set_ctx);
    }

    if (ctx.status === "registered") {
        loadUser(ctx, set_ctx);
    }

    if (ctx.status === "unregistered") {
        navigate('/register');
        return;
    }

    if (ctx.status === "unauthorized") {
        return (
            <div>
                <h1>Doctalk</h1>
                <p>Doctalk is an online consultation platform which aims to blah blah blah</p>
                <button type="button" class="btn btn-primary" onClick={() => window.location.href = 'https://localhost:7000/v1/login'}>Login here</button>
            </div>
        );
    }

    if (ctx.status === "authenticated") {
        return (
            <div>
                <Appointments/>
            </div>
        );
    }

    return "Loading user data...";
}

function loadUser(ctx, set_ctx) {    
    console.log(new Date() + " loading user...");
    fetch("https://localhost:7000/v1/self", {
        credentials: 'include',
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        if (response.status == 200) {
            response.json().then
            (responseJson => {
                set_ctx({user_data: responseJson["user_data"], user_role: responseJson["user_type"], status: "authenticated"});
            });
        } else if (response.status == 404) {
            set_ctx({...ctx, status: "unregistered"});     
        } else if (response.status == 401) {
            set_ctx({...ctx, status: "unauthorized"});
        }
        else {
            set_ctx({...ctx, status: "uninitialized"});
        }
        console.log(new Date() + " updating...");
    });
}

export default Home;