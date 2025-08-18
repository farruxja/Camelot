import React, { useEffect, useRef, useState } from 'react'
import logo from "../img/camelor_loge.png"
import "../styles/createcustomer.css"



function CreateCustomer() {

  let name = useRef()
  let lastname = useRef()
  let phone_number= useRef()
  let time = useRef()
  let teacher = useRef()
  let choosen__sub= useRef()
  



// language choosing//
  let language = useRef()
const[choosen__language, setChoosen__language]=useState("1")
  const handleChange= ()=>{
    const til = language.current.value;
    setChoosen__language(til)
  }

  // language data//
  const languages = [
    { id: "1",  log: "Malumotingizni kiriting", log2: "Ismingiz", log3: "Familiyangiz", log4: "Raqamingiz", log5: "O'zingizga qulay vaqt?", log6: "O'zingizga ustoz tanlang.", log8:"o'qimoqchi bolgan fanig'izni tanlang", log7: 'Kirish', def_time: "Hohlagan vaqt", def__teacher: "Hohlagan ustoz", def__sub:"Hohlagan fan", massage:" Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz"},
    { id: "2",  log: "Введите вашу информацию", log2: "Ваше имя", log3: "Ваша фамилия", log4: "Ваш номер телефона", log5: "Удобное для вас время?", log6: "Выберите наставника.", log8:"Выберите предмет, который хотите изучать", log7: 'Войти', def_time: "В любое время", def__teacher: "Любой учитель", def__sub:"Любой предмет", massage:"Вы успешно зарегистрировались"},
    { id: "3",  log: "Enter your information", log2: "Your name", log3: "Your surname", log4: "Your phone number", log5: "Convenient time for you?", log6: "Choose your mentor.", log8:"Select the subject you want to study", log7: 'Login', def_time: "Anytime", def__teacher: "Any teacher", def__sub:"Any subject", massage:"You have successfully registered"}
];
const chosenLang = languages.find((lang) => lang.id === choosen__language);


useEffect(()=>{
  getEmployee()
  getSubjects()
},[])

// get all amployee //
const [employee, setEployee]= useState([])
async function getEmployee(){
  let fetchEmployee = await fetch("https://dev.edu-devosoft.uz/api/employee/web")
  let json = await fetchEmployee.json()
  setEployee(json)

}


//get all subjects //
const [subjects, setSubjects]= useState([])
async function getSubjects(){
  let fetchSubjects = await fetch("https://dev.edu-devosoft.uz/api/subject/1")
  let json = await fetchSubjects.json()
  setSubjects(json)

}





// creating customer function //
const [username, setUsername]= useState()
async function createCustomer(e){
  e.preventDefault()

  let ready={
    full_name: `${name.current.value} ${lastname.current.value}`,
    phone_number: phone_number.current.value,
    subject_id: Number(choosen__sub.current.value),
    time: time.current.value,
    teacher_name: teacher.current.value,
  }

  let res = await fetch("https://dev.edu-devosoft.uz/api/customer/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(ready)
  });     
  let data = await res.json();   
  console.log(data);

  setUsername(data?.full_name);



   


}
  return (
    employee && employee.length > 0 ? ( <section className='create__customer'>

      <div className="container">

        <div className="massage">
          <h1>{username}</h1>
        </div>
      <div className="header">
                    <div className="header__wrapper">
                        <div className="logo">
                            <img src={logo} alt="" />
                        </div>
                        <select className='til' name="" id="" ref={language}  onChange={handleChange}>
                            <option value="1"> Uz</option>
                            <option value="2"> Rus</option>
                            <option value="3"> Eng</option>
                        </select>


                    </div>
                </div>



                <div className="create"  >

                  
                    <form className='form' onSubmit={(e)=> createCustomer(e)}>
                        <h4>{chosenLang?.log} </h4>



                        <div className="create__content" >
                            <label htmlFor="ism">{chosenLang?.log2}</label>
                            <input ref={name} type="text" id='ism' required />
                            <label htmlFor="fam">{chosenLang?.log3}</label>
                            <input ref={lastname} type="text" id='fam' required />
                            <label htmlFor="num">{chosenLang?.log4}</label>
                            <input ref={phone_number}
                                type="tel"
                                id="num"
                                name="phone"

                                pattern="^\+998\d{9}$"
                                defaultValue={"+998"}
                                placeholder=" 99 *** ** **"
                                required
                            />
                            <div id="choice">
                                <div className="time">
                                    <label htmlFor="time">{chosenLang?.log5}</label>
                                    <select id='time' ref={time} required>
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
                                    <select id='teacher' ref={teacher} required>
                                        <option value="hohlagan ustoz">{chosenLang?.def__teacher}</option>
                                        {employee?.map((item, index) => {
                                            return (
                                                <option key={index} value={item?.full_name}>{item?.full_name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="subject">
                                  <label htmlFor="sub">{chosenLang?.log8}</label>
                                  <select  id="sub" ref={choosen__sub}>
                                    <option value="2">{chosenLang?.def__sub}</option>
                                    {subjects?.map((item ,index)=>(
                                      <option key={index} value={item?.id}>{item?.name}</option>
                                    ))}
                                  </select>
                                </div>

                            </div>




                        </div>
                        <button className='login__button' type="submit" >{chosenLang?.log7}</button>
                    </form>



                </div>
             
      </div>
    





        
      
    </section>):(<div className="load">
            <span className='loader'></span>
        </div>)
  )
}

export default CreateCustomer
