import React from "react";
import logo from "./logo.png"
const Header=(props)=>{
    return ( 
        <header className="header">
        <div className="logo">
    <img className="logo-img" src={logo} alt="Logo was here" height="68" width="68" />
    <h1 className="heading">Today I Learned</h1>
</div>
    <button className="btn btn--large btn--open" onClick={props.click}>{props.texts}</button>
</header>
    );
}
export default Header;