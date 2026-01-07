import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../img/camelor_loge.png'
import "../styles/register.css"
function Register() {



   const [language, setLanguage] = useState("1")



    const language__choos = useRef()
    const handleChangelang = () => {
        const til = language__choos.current.value;
        setLanguage(til)


    }
   
  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);
  

 

  const TEXT = {
    uz: {
      title: "Ma'lumotlaringizni kiriting",
      subtitle: "Test natijalarini saqlash uchun ma'lumotlar kerak.",
      firstName: "Ismingiz",
      lastName: "Familiyangiz",
      phone: "Telefon raqamingiz",
      time: "Qulay vaqt",
      teacher: "Ustoz tanlang",
      anyTime: "Hohlagan vaqt",
      anyTeacher: "Hohlagan ustoz",
      coursetime:"ertalabki guruh",
      coursetime2:"tushdan keyingi guruh",
      submit: "Kirish",
      loading: "Yuklanmoqda...",
      error: "Ro‘yxatdan o‘tishda xatolik",
      noTest: "Test tanlanmagan",

    },
    ru: {
      title: "Введите ваши данные",
      subtitle: "Данные нужны для сохранения результатов теста.",
      firstName: "Имя",
      lastName: "Фамилия",
      phone: "Номер телефона",
      time: "Удобное время",
      teacher: "Выберите учителя",
      anyTime: "Любое время",
      anyTeacher: "Любой учитель",
         coursetime: "утренняя группа",

coursetime2: "послеобеденная группа",
      submit: "Войти",
      loading: "Загрузка...",
      error: "Ошибка регистрации",
      noTest: "Тест не выбран",
    },
    en: {
      title: "Enter your information",
      subtitle: "Information is required to save test results.",
      firstName: "First name",
      lastName: "Last name",
      phone: "Phone number",
      time: "Preferred time",
      teacher: "Choose a teacher",
      anyTime: "Any time",
      anyTeacher: "Any teacher",
      coursetime: "morning group",

coursetime2: "afternoon group",
      submit: "Login",
      loading: "Loading...",
      error: "Registration error",
      noTest: "Test not selected",
    },
  };

  const t = TEXT[language === "1" ? "uz" : language === "2" ? "ru" : "en"];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "+998",
    time: t.anyTime,
    teacher: t.anyTeacher,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

 

  async function handleSubmit(e) {
    e.preventDefault();

    const subject_id = localStorage.getItem("choosen_test_id");
    if (!subject_id) return alert(t.noTest);

    const payload = {
      full_name: `${formData.firstName} ${formData.lastName}`,
      phone_number: formData.phone,
      subject_id: +subject_id,
      time: formData.time,
      teacher_name: formData.teacher,
    };

    try {
      setLoading(true);
      const res = await fetch(
        "https://dev.edu-devosoft.uz/api/customer/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();
      if (!json?.customer?.id) return alert(t.error);

      localStorage.setItem("customerId", json.customer.id);
      navigate("/test");
    } finally {
      setLoading(false);
    }
  }

  return (
    
   <main>
    <div className="reg__header">
                    <div className="header__wrapper">
                        <div className="logo">
                       
                  <NavLink to="/"><img src={logo} alt="" /></NavLink>
                        </div>
                        <select className='til' name="" id="" ref={language__choos} onChange={handleChangelang}>
                            <option value="1"> Uz</option>
                            <option value="2"> Rus</option>
                            <option value="3"> Eng</option>
                        </select>


                    </div>
                </div>
     <div id="formm" className="flex-grow flex items-center justify-center p-6 bg-white ">
      <div id="dov" className="border-0 shadow-none max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div  id="dov" className="bg-white  md:p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-[#2D3494] tracking-tight">
              {t.title}
            </h2>
            <p className="text-slate-500 text-sm mt-2">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* FIRST NAME */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                {t.firstName}
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100
                focus:border-[#2D3494] focus:ring-4 focus:ring-blue-50 outline-none transition-all"
              />
            </div>

            {/* LAST NAME */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                {t.lastName}
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100
                focus:border-[#2D3494] focus:ring-4 focus:ring-blue-50 outline-none transition-all"
              />
            </div>

            {/* PHONE */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                {t.phone}
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                pattern="^\+998\d{9}$"
                required
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100
                focus:border-[#2D3494] focus:ring-4 focus:ring-blue-50 outline-none transition-all"
              />
            </div>

            {/* SELECTS */}
         
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100
                focus:border-[#2D3494] focus:ring-4 focus:ring-blue-50 outline-none"
              >
                <option>{t.anyTime}</option>
                <option>{t.coursetime}</option>
                <option>{t.coursetime2}</option>
              </select>

             
          

            <button
              disabled={loading}
              className="w-full py-5 bg-[#2D3494] text-white rounded-2xl font-bold text-lg
              shadow-xl shadow-blue-200 hover:bg-[#1E2474] active:scale-[0.98] transition-all"
            >
              {loading ? t.loading : t.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
   </main>
  );
}

export default Register;
