import React, { useEffect, useRef, useState } from 'react'
import '../styles/hero.css'
import { NavLink} from 'react-router-dom'


import logo from '../img/camelor_loge.png'
function Hero() {

    let start = useRef()
 
    const [employee, setEmployee] = useState(null)

    const [question, setQuestion] = useState([])









    const [language, setLanguage] = useState("1")



    const language__choos = useRef()
    const handleChange = () => {
        const til = language__choos.current.value;
        setLanguage(til)


    }
    localStorage.setItem("choos__lan", language)

    useEffect(() => {

        getEmployee()
        getQuestion()
        



    }, [])


    async function getEmployee() {
        let fetchEmployee = await fetch('https://dev.edu-devosoft.uz/api/employee/web')
        let json = await fetchEmployee.json()

        setEmployee(json)
    }

let rule = useRef()  
    function openTest() {
        start.current.classList.add("start")
        rule.current.classList.add("open__rule")



    }




    
   






    async function getQuestion() {
        let fetchQuestion = await fetch("https://dev.edu-devosoft.uz/api/test/getSchoolId/6");
        let json = await fetchQuestion.json();
        setQuestion(json)




    }




    // test idni olib localga saqlaydi

    function navigateByTestId(e, id, count, subject_id) {



        localStorage.setItem('choosen_test_id', id);
        localStorage.setItem('count', count);
       







    }



const languages = [
  { 
    id: "1", 
    name: "Bilimingizni jahon standartlari asosida tekshiring va kelajak sari birinchi qadamni tashlang.",
    name2: "ta Savol",
    name3: "A1 darajadan boshlanib, asta-sekin qiyinlashadi.",
    name4:"Daqiqa",
    name5:"Vaqtni to'g'ri taqsimlang va natijaga erishing.",
    name6:"Natijalar",
    name7:"Test yakunida batafsil tahlilga ega bo'ling.",
    btn: "Testni boshlash",
    log: "Malumotingizni kiriting",
    log2: "Ismingiz",
    log3: "Familiyangiz",
    log4: "Raqamingiz",
    log5: "O'zingizga qulay vaqt?",
    log6: "O'zingizga ustoz tanlang.",
    log7: 'Kirish',
    def_time: "Hohlagan vaqt",
    def__teacher: "Hohlagan ustoz",
    rule1: "Savollar sodda (A1) darajadan qiyin (C1) darajagacha o'sib boradi.",
    rule2: "Sizda jami {time} daqiqa vaqt bor. Timer to'xtasa, test yakunlanadi.",
    rule3: "Savollarga javob berish uchun eng to'g'ri variantni tanlang.",
    rule4: "Sahifadan chiqib ketmang, aks holda natijangiz saqlanmasligi mumkin."
  },
  { 
    id: "2",
    name: "Проверьте свои знания по мировым стандартам и сделайте первый шаг в будущее.",
    name2: "вопросы",
    name3: "Начиная с уровня A1, постепенно усложняясь.",
    name4:"Минуты",
    name5:"Правильно распределите время и достигните результата.",
    name6:"Результаты",
    name7:"Получите подробный анализ в конце теста.",
    btn: "Начать тест",
    log: "Введите вашу информацию",
    log2: "Ваше имя",
    log3: "Ваша фамилия",
    log4: "Ваш номер",
    log5: "Удобное для вас время?",
    log6: "Выберите себе учителя.",
    log7: 'Войти',
    def_time: "Любое время",
    def__teacher: "Любой учитель",
    rule1: "Вопросы растут от простых (A1) до сложных (C1).",
    rule2: "У вас есть {time} минут. Когда таймер остановится, тест завершится.",
    rule3: "Выберите самый правильный вариант ответа.",
    rule4: "Не покидайте страницу, иначе результат может не сохраниться."
  },
  { 
    id: "3",
    name: "Test your knowledge based on global standards and take the first step towards the future.",
    name2: "Questions",
    name3: "Starting from A1 level, gradually getting more difficult.",
    name4:"Minutes",
    name5:"Manage your time well and achieve results.",
    name6:"Results",
    name7:"Get a detailed analysis at the end of the test.",
    btn: "Start the test",
    log: "Enter your information",
    log2: "Your name",
    log3: "Your surname",
    log4: "Your number",
    log5: "A convenient time for you?",
    log6: "Choose a teacher for yourself.",
    log7: 'Login',
    def_time: "Any time",
    def__teacher: "Any teacher",
    rule1: "Questions increase from easy (A1) to hard (C1).",
    rule2: "You have {time} minutes. When the timer stops, the test ends.",
    rule3: "Select the most correct answer.",
    rule4: "Do not leave the page, otherwise your result may not be saved."
  },
];


    const chosenLang = languages.find((lang) => lang.id === language);




 


const [testTime, setTestTime] = useState(0);
    

    return (
        employee && employee.length > 0 ? (<section className='hero'>
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
                        <div className="boshla relative overflow-hidden flex-grow flex items-center justify-center py-20 px-4" ref={start} onClick={(e) => navigateByTestId(e, item.id, item.count, item.subject_id, setTestTime(item.time)) } key={item.id} >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

         <div className="max-w-4xl w-full text-center space-y-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[#2D3494] font-bold text-xs tracking-widest uppercase mb-4 animate-bounce">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D3494] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D3494]"></span>
            </span>
            Online Proficiency Test
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-[#2D3494] tracking-tighter leading-none">
           {item.subject.name}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
           {chosenLang?.name}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-[#2D3494] mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-bold text-slate-900"> {item?.count} {chosenLang?.name2}</h3>
            <p className="text-sm text-slate-500">{chosenLang?.name3}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-[#2D3494] mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-bold text-slate-900">{item?.time} {chosenLang?.name4}</h3>
            <p className="text-sm text-slate-500">{chosenLang?.name5}</p>
          </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-[#2D3494] mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-bold text-slate-900">{chosenLang?.name6}</h3>
            <p className="text-sm text-slate-500">{chosenLang?.name7}</p>
          </div>
        </div>

        <button 
          onClick={openTest}
          id="hero__btn"
          className="group relative px-12 py-5 bg-gradient-to-r from-[#2D3494] to-[#4351DB] text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 transform hover:-translate-y-1 transition-all duration-300 active:scale-95"
        >
          <span className="flex items-center gap-2">
            {chosenLang?.btn}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </button>
      </div>


                          

                         

                        </div>
                    )
                })}

                <div >







                </div>





               
<div ref={rule} className="rule flex-grow flex items-center justify-center bg-slate-50/50">
      <div className="max-w-2xl w-full bg-white p-10 md:p-14 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 animate-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-[#2D3494] mb-4">
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.246.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.246.477-4.5 1.253" />
             </svg>
          </div>
          
          <h2 className="text-3xl font-black text-[#2D3494]">Test qoidalari</h2>
          
          <ul className="text-left space-y-4 max-w-md mx-auto">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">1</span>
              <p className="text-slate-600 leading-tight">{chosenLang?.rule1}</p>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">2</span>
              <p className="text-slate-600 leading-tight">  {chosenLang?.rule2.replace("{time}", testTime)}</p>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">3</span>
              <p className="text-slate-600 leading-tight">{chosenLang?.rule3}</p>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">!</span>
              <p className="text-slate-600 leading-tight font-semibold italic">{chosenLang?.rule4}</p>
            </li>
          </ul>

          <div className="pt-6 w-full">
           <NavLink to={"/register"} > <button
             
              className="w-full py-5 bg-[#2D3494] text-white rounded-2xl font-bold text-xl shadow-xl shadow-blue-200 hover:shadow-blue-300 transform hover:scale-[1.02] active:scale-95 transition-all"
            >
              Tayyorman, boshlaymiz!
            </button></NavLink>
            <p className="mt-4 text-xs text-slate-400 font-medium">Boshlash tugmasini bosishingiz bilan timer ishga tushadi.</p>
          </div>
        </div>
      </div>
    </div>





























            </div>

        </section>) : (<div className="load">
            <span className='loader'></span>
        </div>)
    )
}

export default Hero