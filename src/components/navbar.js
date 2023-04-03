import React from "react";
import logo from '../logo.svg';
import { useNavigate } from "react-router-dom";
  
const Navbar = () => {
  const navigate = useNavigate();
  
  const goHome = () => {
    navigate("/");
  }

  const goProfile = () => {
    navigate("/profile");
  }
  
  return (
    <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a style={{cursor: 'pointer'}} class="navbar-brand" onClick={() => goHome()}>
            <img src={logo} alt="Logo" width="35" height="38" class="d-inline-block align-text-top"></img>
            DocTalk
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a style={{cursor: 'pointer'}} class="nav-link active" aria-current="page" onClick={() => goHome()}>Home</a>
                <a style={{cursor: 'pointer'}} class="nav-link" onClick={() => goProfile()}>Profile</a>
            </div>
            </div>
        </div>
    </nav>
    </>
  );
};
  
export default Navbar;