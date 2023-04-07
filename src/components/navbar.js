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
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a style={{cursor: 'pointer'}} className="navbar-brand" onClick={() => goHome()}>
            <img src={logo} alt="Logo" width="35" height="38" className="d-inline-block align-text-top"></img>
            DocTalk
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <a style={{cursor: 'pointer'}} className="nav-link active" aria-current="page" onClick={() => goHome()}>Home</a>
                <a style={{cursor: 'pointer'}} className="nav-link active" onClick={() => goProfile()}>Profile</a>
            </div>
            </div>
        </div>
    </nav>
    </>
  );
};
  
export default Navbar;