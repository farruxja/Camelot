import React from 'react'
import logo from "../img/camelor_loge.png"
import '../styles/header.css'

function Header() {
  return (
    <header className='header'>
        <div className="container">



            <div className="header__wrapper">

                <div className="logo">
                <img src={logo} alt="" />
                </div>
                <select className='til' name="" id="">
                  <option value=""> Uz</option>
                  <option value=""> Rus</option>
                  <option value=""> Eng</option>
                </select>


            </div>
        </div>
      
    </header>
  )
}

export default Header
