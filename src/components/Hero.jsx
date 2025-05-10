import React, { useEffect, useRef, useState } from 'react'
import '../styles/hero.css'
import { useNavigate } from 'react-router-dom'


function Hero() {

    let start = useRef()
    let login = useRef()
 
    let name = useRef()
    let phone = useRef()
    let lastname = useRef()
    let time = useRef()
    let teacher_name = useRef()
    const [employee, setEmployee] = useState(null)

    const [question, setQuestion] = useState()




    let navigate = useNavigate()






    useEffect(() => {
        getEmployee()
        getQuestion()

    }, [])


    async function getEmployee() {
        let fetchEmployee = await fetch('https://dev.edu-devosoft.uz/api/employee/web')
        let json = await fetchEmployee.json()

        setEmployee(json)
    }


    function openTest() {
        start.current.classList.add("start")
        login.current.classList.add("login__open")



    }


    const [sub_id, setSub_id] = useState()


    async function testBosh(e) {
        let ready = {
            full_name: `${name.current.value} ${lastname.current.value}`,
            phone_number: phone.current.value,
            subject_id: sub_id,
            time: time.current.value,
            teacher_name: teacher_name.current.value,
        }
        e.preventDefault()

        let loginCustom = await fetch("https://dev.edu-devosoft.uz/api/customer/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ready)
        });
        let jsonA = await loginCustom.json()


        localStorage.setItem("customerId", jsonA.customer.id)




        navigate('/test')





    }









    async function getQuestion() {
        let fetchQuestion = await fetch("https://dev.edu-devosoft.uz/api/test");
        let json = await fetchQuestion.json();
        setQuestion(json)




    }




    // test idni olib localga saqlaydi

    function navigateByTestId(e, id, count, subject_id) {
      


        localStorage.setItem('choosen_test_id', id);
        localStorage.setItem('count', count);


        setSub_id(subject_id)





    }














    return (
        <section className='hero'>
            {/* tetsni boshlash qismi */}


            <div className="container">


                {question?.map((item) => {
                    return (
                        <div className="boshla" ref={start} onClick={(e) => navigateByTestId(e, item.id, item.count, item.subject_id)} key={item.id} >
                            <h1>{item.subject.name}</h1>
                         

                            <p>Savollar Boshlang'ich (A1) darajasidan boshlanadi va asta-sekin qiyinlashadi. Jami {item.count} ta savol bor, vaqt chegarasi {item?.time} daqiqa. Gapni yakunlash uchun eng yaxshi variantni tanlang. Pastga aylantiring va savollarga javob bering!</p>

                            <button className='boshla_btn' onClick={openTest}>Testni boshlash</button>


                        </div>
                    )
                })}

                <div >







                </div>





                {/* login qismi  */}

                <div className="login" ref={login} >
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


                                defaultValue={"+998"}
                                placeholder=" 99 *** ** **"
                                required
                            />
                            <div id="choice">
                                <div className="time">
                                    <label htmlFor="time">O'zingizga qulay vaqt ?</label>
                                    <select id='time' ref={time} >
                                        <option value="08:00-10:00">08:00-10:00</option>
                                        <option value="10:12:00">10:00-12:00</option>
                                        <option value="14:00-16:00">14:00-16:00</option>
                                        <option value="16:00-18:00">16:00-18:00</option>
                                        <option value="18:30-20:30">18:30-20:30</option>

                                    </select>
                                </div>
                                <div className="teacher" >
                                    <label htmlFor="teacher">O'zingizga ustoz tanglang.</label>
                                    <select id='teacher' ref={teacher_name}>
                                        {employee?.map((item, index) => {
                                            return (
                                                <option key={index} value={item?.full_name}>{item?.full_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                            </div>




                        </div>
                        <button className='login__button' type="submit">Kirish</button>
                    </form>



                </div>





























            </div>

        </section>
    )
}

export default Hero