import React, { useState } from 'react'
import '../styles/hero.css'
import loginimg from '../img/{991DBD5A-59E5-4BF4-A110-2B7C196A4317}.png'
function Hero() {

    let start = useState()
    let login = useState()
    let login__bc = useState()








    function startTest() {
        start.current.classList.add("start")
        login.current.classList.add("login__open")
        login__bc.current.classList.add("login__bc__open")


    }
    function testBosh(){
        login.current.classList.remove("login__open")
        login__bc.current.classList.remove("login__bc__open")

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



                    <button onClick={startTest}>Testni boshlash</button>

                </div>





                {/* login qismi  */}
                <div className="login__bc" ref={login__bc}  style={{backgroundImage:`url(${loginimg})`}}>
               
                </div>
                <div className="login" ref={login}>
                    <form className='form' onSubmit={testBosh}>
                        <h4>Malumotlaringizni toldiring </h4>



                        <label htmlFor="ism">Ismingiz</label>
                        <input type="text" id='ism' />
                        <label htmlFor="fam">Familangiz</label>
                        <input type="text" id='fam' />
                        <label htmlFor="num">Raqamingiz</label>
                        <input
                            type="tel"
                            id="num"
                            name="phone"
                            placeholder="+998 90 123 45 67"
                            pattern="^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$"
                            required
                        />
                        <button type="submit">Kirish</button>
                    </form>


                </div>
























            </div>

        </section>
    )
}

export default Hero
