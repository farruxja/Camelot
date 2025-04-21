import React, { useRef, useState } from 'react'
import '../styles/hero.css'

function Hero() {

    let start = useState()
    let login = useState()
    let test = useRef()









    function startTest() {
        start.current.classList.add("start")
        login.current.classList.add("login__open")


    }
    function testBosh(e) {
        e.preventDefault()
        login.current.classList.remove("login__open")
        test.current.classList.add("test__open")


    }








    return (
        <section className='hero'>

            {/* tetsni boshlash qismi */}
            <div className="container">
                <div className="boshla" ref={start}>
                    <h1>Ingliz tili darajasi testi</h1>
                    <p>Ingliz tili darajasi testiga xush kelibsiz!

                        Ushbu test ingliz tili grammatikasi bo'yicha bilimingizni baholaydi.</p>

                    <p>Savollar Boshlang'ich (A1) darajasidan boshlanadi va asta-sekin qiyinlashadi. Jami 60 ta savol bor, vaqt chegarasi 30 daqiqa. Gapni yakunlash uchun eng yaxshi variantni tanlang. Pastga aylantiring va savollarga javob bering!</p>



                    <button className='boshla_btn' onClick={startTest}>Testni boshlash</button>

                </div>





                {/* login qismi  */}

                <div className="login" ref={login}>
                    <form className='form' onSubmit={testBosh}>
                        <h4>Malumotingizni kiriting </h4>



                   <div className="login__content">
                   <label htmlFor="ism">Ismingiz</label>
                        <input type="text" id='ism'  required/>
                        <label htmlFor="fam">Familiyangiz</label>
                        <input type="text" id='fam' required/>
                        <label htmlFor="num">Raqamingiz</label>
                        <input
                            type="tel"
                            id="num"
                            name="phone"
                            placeholder="+998 99 *** ** **"
                            pattern="^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$"
                            required
                        />



                       <div id="choice"> <button>Vaqt</button>
                        <button>Ustoz</button></div>
                   </div>
                        <button className='login__button' type="submit">Kirish</button>
                    </form>


                </div>




                 {/* test  qismi  */}

                 <div className="test" ref={test}>
                  <div className="test__div">
                  <h2>1. savol. siz kecha abetga nima yedingiz ? </h2>

                  <div className="varyant">
                    <h4>A) osh</h4>
                    <h4>B) shorva</h4>
                    <h4>D) lagmon</h4>
                  </div>
                  </div>

                 </div>
























            </div>

        </section>
    )
}

export default Hero
