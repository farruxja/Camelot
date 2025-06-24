import React, { useEffect, useRef, useState } from 'react'
import '../styles/hero.css'
import { useNavigate } from 'react-router-dom'
import logo from "../img/camelor_loge.png"

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




    const [language, setLanguage] = useState("1")



    const language__choos = useRef()
    const handleChange = () => {
        const til = language__choos.current.value;
        setLanguage(til)
      
        localStorage.setItem("choos__lan", til)

    }

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



        const languages = [
            { id: "1", name: "Savollar Boshlang'ich (A1) darajasidan boshlanadi va asta-sekin qiyinlashadi. Jami", name2: "ta savol bor, vaqt chegarasi", name3: "daqiqa. Gapni yakunlash uchun eng yaxshi variantni tanlang. Pastga aylantiring va savollarga javob bering!", btn: "Testni boshlash", log:"Malumotingizni kiriting", log2:"Ismingiz", log3:"Familiyangiz", log4:"Raqamingiz", log5:"O'zingizga qulay vaqt?", log6:"O'zingizga ustoz tanlang.", log7:'Kirish', def_time:"Hohlagan vaqt", def__teacher:"Hohlagan ustoz" },
            { id: "2", name: "Вопросы начинаются с начального (A1) уровня и постепенно усложняются. Всего", name2: "вопросов, лимит времени — ", name3: "минут. Выберите лучший вариант для завершения предложения. Прокрутите вниз и ответьте на вопросы!", btn: "Начать тест", log:"Введите вашу информацию", log2:"Ваше имя", log3:"Ваша фамилия", log4:"Ваш номер телефона", log5:"Удобное для вас время?", log6:"Выберите наставника.", log7:'Войти' , def_time:"В любое время", def__teacher:"Любой учитель"},
            { id: "3", name: "The questions start from the beginner (A1) level and gradually become more difficult. There are a total of", name2: "questions with a time limit of", name3: "minutes. Choose the best option to complete the sentence. Scroll down and answer the questions!", btn: "Start the test", log:"Enter your information", log2:"Your name", log3:"Your surname", log4:"Your phone number", log5:"Convenient time for you?", log6:"Choose your mentor.", log7:'Login', def_time:"Anytime", def__teacher:"Any teacher" }
        ];


        const chosenLang = languages.find((lang) => lang.id === language);










        return (
            employee && employee.length > 0 ?  (<section className='hero'>
                {/* tetsni boshlash qismi */}


                <div className="container">
                    <div className="header">
                        <div className="header__wrapper">

                            <div className="logo">
                                <img src={logo} alt="" />
                            </div>
                            <select className='til' name="" id="" ref={language__choos} onChange={handleChange}>
                                <option value="1"> Uz</option>
                                <option value="2"> Rus</option>
                                <option value="3"> Eng</option>
                            </select>


                        </div>
                    </div>

                    {question?.map((item) => {
                        return (
                            <div className="boshla" ref={start} onClick={(e) => navigateByTestId(e, item.id, item.count, item.subject_id)} key={item.id} >
                                <h1>{item.subject.name}</h1>


                                <p>{chosenLang?.name} {item.count} {chosenLang?.name2} {item?.time} {chosenLang?.name3}</p>

                                <button className='boshla_btn' onClick={openTest}>{chosenLang?.btn}</button>


                            </div>
                        )
                    })}

                    <div >







                    </div>





                    {/* login qismi  */}

                    <div className="login" ref={login} >
                        <form className='form' onSubmit={(e) => testBosh(e)}>
                            <h4>{chosenLang?.log} </h4>



                            <div className="login__content">
                                <label htmlFor="ism">{chosenLang?.log2}</label>
                                <input ref={name} type="text" id='ism' required />
                                <label htmlFor="fam">{chosenLang?.log3}</label>
                                <input ref={lastname} type="text" id='fam' required />
                                <label htmlFor="num">{chosenLang?.log4}</label>
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
                                        <label  htmlFor="time">{chosenLang?.log5}</label>
                                        <select id='time' ref={time}  required>
                                            <option value="hohlagan vaqt">{chosenLang?.def_time}</option>
                                            <option value="08:00-10:00">08:00-10:00</option>
                                            <option value="10:00-12:00">10:00-12:00</option>
                                            <option value="14:00-16:00">14:00-16:00</option>
                                            <option value="16:00-18:00">16:00-18:00</option>
                                            <option value="18:30-20:30">18:30-20:30</option>

                                        </select>
                                    </div>
                                    <div className="teacher" >
                                        <label htmlFor="teacher">{chosenLang?.log6}</label>
                                        <select id='teacher' ref={teacher_name} required>
                                        <option value="hohlagan ustoz">{chosenLang?.def__teacher}</option>
                                            {employee?.map((item, index) => {
                                                return (
                                                    <option key={index} value={item?.full_name}>{item?.full_name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                </div>




                            </div>
                            <button className='login__button' type="submit">{chosenLang?.log7}</button>
                        </form>



                    </div>





























                </div>

            </section> ):(<div className="load">
                <span className='loader'></span>
            </div>)
        )
    }

    export default Hero