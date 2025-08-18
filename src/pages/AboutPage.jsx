import React from 'react'
import "../styles/about.css"
import logo from "../img/logo__about.png"
import telegram from "../img/telegram__about.png"
import instagram from "../img/insta_about.png"
import phone from "../img/phone_about.png"
import { NavLink } from 'react-router-dom'
import login from "../img/login_about.png"
import check from "../img/test_about.png"
import { useEffect } from 'react';
import Aos from 'aos';
import "aos/dist/aos.css";

function AboutPage() {
  useEffect(()=>{
    Aos.init({
      duration:800,
      once:true,
    })
  })
  return (
    <section className='about'>
      <div className="about__content">
        <div className="about__logo">
            <div className="about__logo__div">
                <img src={logo} alt="" />
            </div>
        </div>

        <div className="about__links">

            <a href="https://t.me/ruslan_cm1">
            <img data-aos="fade-up" src={telegram} alt="" />
            <h4 data-aos="fade-up">@ruslan_cm1</h4>
            </a>

            <a href="https://www.instagram.com/camelot_lc/">
              <img data-aos="fade-up" src={instagram} alt="" />
              <h4 data-aos="fade-up">
                @camelot_lc
              </h4>
            </a>
            <a href="tel:+998500740747">
              <img data-aos="fade-up" src={phone} alt="" />
              <h4 data-aos="fade-up">+998-50-074-07-47</h4>
            </a>
            <NavLink to={"/leads"}>
<img data-aos="fade-up" src={login} alt="" />
<h4 data-aos="fade-up">Ro'yxatdan o'tish</h4>
            </NavLink>
            <NavLink to={"/"}>
<img data-aos="fade-up" src={check} alt="" />
<h4 data-aos="fade-up">Bilimingizni sinab ko'rinng !</h4>
            </NavLink>
           
        </div>
      </div>
    </section>
  )
}

export default AboutPage
