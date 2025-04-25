import React, { useRef } from 'react'
import '../styles/hero.css'


function Hero() {

    let start = useRef()
    let login = useRef()
    let test = useRef()
    let name = useRef()
    let phone = useRef()
    let lastname = useRef()










    function openTest() {
        start.current.classList.add("start")
        login.current.classList.add("login__open")


    }
    function testBosh(e) {
        let ready = {
       
            full_name: `${name.current.value} ${lastname.current.value}`,

            phone_number: phone.current.value,
         
            subject_id: 1,
          
        }
        e.preventDefault()
        fetch("https://dev.edu-devosoft.uz/api/customer/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ready)
        })
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



                    <button className='boshla_btn' onClick={openTest}>Testni boshlash</button>

                </div>





                {/* login qismi  */}

                <div className="login" ref={login}>
                    <form className='form' onSubmit={(e) => testBosh(e)}>
                        <h4>Malumotingizni kiriting </h4>



                        <div className="login__content">
                            <label htmlFor="ism">Ismingiz</label>
                            <input ref={name} type="text" id='ism' required />
                            <label htmlFor="fam">Familiyangiz</label>
                            <input ref={lastname} type="text" id='fam' required />
                            <label htmlFor="num">Raqamingiz</label>
                            <input ref={phone}
                                type="tel"
                                id="num"
                                name="phone"
                                placeholder="99 *** ** **"

                                required
                            />
                            <div id="choice">
                                <div className="time">
                                    <label htmlFor="time">O'zingizga qulay vaqt ?</label>
                                    <select id='time'  >
                                        <option value="8">08:00-10:00</option>
                                        <option value="10">10:00-12:00</option>
                                        <option value="12">12:00-14:00</option>
                                        <option value="14">14:00-16:00</option>
                                        <option value="16">16:00-18:00</option>
                                        <option value="18">18:00-20:00</option>
                                    </select>
                                </div>
                                <div className="teacher" >
                                    <label htmlFor="teacger">O'zingizga ustoz tanglang.</label>
                                    <select id='teacher' >
                                        <option value="shag'boz">Shag'boz</option>
                                        <option value="zuhur">Zuhur</option>
                                        <option value="husniddin">Husniddin</option>
                                        <option value="dilmurod">Dilmurod</option>
                                        <option value="sheroz">Sheroz</option>

                                    </select>
                                </div>

                            </div>




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
