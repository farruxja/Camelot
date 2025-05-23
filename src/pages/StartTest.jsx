import React, { useEffect, useReducer, useRef, useState } from 'react'
import '../styles/test.css'
import { useNavigate } from 'react-router-dom'
import correctimg from '../img/correctImg.png'

function StartTest() {
    let navigate = useNavigate()
    const [questions, setQuestions] = useState([])
    const [ignore, fourceUpdate] = useReducer(x => x + 1)
    const [remainingTime, setRemainingTime] = useState(0);

    const [time, setTime] = useState(null)

    async function getQuestions() {
        let fetchQuestion = await fetch(`https://dev.edu-devosoft.uz/api/test/${localStorage.getItem("choosen_test_id")}`);
        let json = await fetchQuestion.json();
        setQuestions(json.questions);




        if (json.questions) {
            fourceUpdate()
        }
    }




    const intervalRef = useRef(null);

    useEffect(() => {
        const now_time = new Date().toISOString();
        localStorage.setItem('start_time', now_time);
        getQuestions();
        async function fetchTime() {
            let response = await fetch(`https://dev.edu-devosoft.uz/api/test/${localStorage.getItem("choosen_test_id")}`);
            let json = await response.json();

            setTime(json.time)
            if (json.time) {
                setRemainingTime(json.time * 60); // daqiqani soniyaga o'tkazamiz

                // Timer start
                if (intervalRef.current) {
                    clearInterval(intervalRef.current); // eski intervalni to'xtatish
                }

                intervalRef.current = setInterval(() => {
                    setRemainingTime((prev) => {
                        if (prev <= 1) {
                            clearInterval(intervalRef.current);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        }
        fetchTime();

        return () => clearInterval(intervalRef.current);

    }, [ignore])
    const [totaltime, setTotaltime] = useState(null)
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };
    const handleFinish = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        const totalTime = (time * 60) - remainingTime;
        setTotaltime(totalTime);
    };







    const [answers, setAnswers] = useState([]);
    const handleOptionChange = (questionId, optionId) => {
        setAnswers(prevAnswers => {
            const filtered = prevAnswers.filter(ans => ans.question_id !== questionId);
            const updatedAnswers = [...filtered, { question_id: questionId, option_id: optionId }];


            if (updatedAnswers.length >= 1) {
                setBtn(false);
            }

            return updatedAnswers;
        });

    };

    const [nat_yak, setNat_yak] = useState(true)
    const [custumer_test_id, setCustomer_test_id] = useState("")
    async function SaveResul() {
        handleFinish()


        let now = new Date().toISOString();
        let customer = {
            customer_id: +localStorage.getItem('customerId'),
            test_id: +localStorage.getItem("choosen_test_id"),
            started_at: localStorage.getItem('start_time'),
            finished_at: now
        }

        let fetchQuestion = await fetch(`https://dev.edu-devosoft.uz/api/customer-test`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        });
        let json = await fetchQuestion.json();
        console.log(json.customer_test.id);
     

        if (json?.customer_test?.id) {
            setCustomer_test_id(json.customer_test.id);
            setNat_yak(false)
        }


    }
    let timer__ab = useRef()
    const [level, setLevel] = useState([])
    let resault = useRef();
    async function openResault() {


        let ready = answers.map(item => ({
            ...item,
            customer_test_id: custumer_test_id  // yangi key va bir xil qiymat
        }));
        const bodyData = {
            list: ready,
        };
        let fetchQuestion = await fetch(`https://dev.edu-devosoft.uz/api/customer-answer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        });
        let json = await fetchQuestion.json();

        setLevel(json)
        console.log(json);




        resault.current.classList.add("resault__open");
        timer__ab.current.classList.add("none");



    }

    function closeResault() {

        navigate("/")
    }



    useEffect(() => {
        const handleScroll = () => {

            if (timer__ab.current) { // Reference mavjudligini tekshirish
                if (window.scrollY >= 10) {
                    timer__ab.current.classList.add('fixed-timer');
                } else {
                    timer__ab.current.classList.remove('fixed-timer');
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const [btn, setBtn] = useState(true)
    let count = +localStorage.getItem("count")


    const lang__btn = [
        {
            id: "1",
            name: "Yakunlash",
            name2: "Natijani ko‘rish",
            res: "Marhamat, natijangizni ko‘rishingiz mumkin",
            res2: "Sizning darajangiz",
            res3: "Siz bu testni",
            res4: "daqiqada ishlab tugatdingiz va",
            res5: "ta savoldan",
            res6: "tasiga to‘g‘ri javob berdingiz.",
            res7: "Sizga adminlarimiz bog‘lanishadi. Iltimos, kuting...",
            allres: "Javoblaringizni ko‘ring"
        },
        {
            id: "2",
            name: "Finish",
            name2: "View Result",
            res: "Here are your results:",
            res2: "Your level is",
            res3: "You completed this test in",
            res4: "minutes and answered",
            res5: "out of",
            res6: "questions correctly.",
            res7: "Our administrators will contact you. Please wait...",
            allres: "View your answers"
        },
        {
            id: "3",
            name: "Завершить",
            name2: "Посмотреть результат",
            res: "Пожалуйста, ознакомьтесь с вашими результатами",
            res2: "Ваш уровень",
            res3: "Вы завершили тест за",
            res4: "минут и правильно ответили на",
            res5: "из",
            res6: "вопросов.",
            res7: "С вами свяжутся наши администраторы. Пожалуйста, подождите...",
            allres: "Посмотреть ваши ответы"
        }
    ];

    const language = localStorage.getItem("choos__lan")

    const chosenLang = lang__btn.find((lang) => lang.id === language);



    let allresault = useRef()
    let alltest = useRef()
   


   
    let merged = questions?.map(itemB => {
        let results = level?.customerAnswers
        let itemA = results?.find(a => a.question_id === itemB.id);
        const correctOption = itemB.option.find(opt => opt.is_correct);
        return {
            ...itemB,
            ...(itemA ? { 
                your_answer_id: itemA.option_id,
                is_correct: itemA.is_correct,
                selected_option_text: itemB.option.find(opt => opt.id === itemA?.option_id)?.option,
                correct_option_text: correctOption?.option // To'g'ri javob matni
            } : {})
        };
    });
     function openAllresault() {
        if (resault.current) resault.current.classList.add("resault__none");
        if (alltest.current) alltest.current.classList.add("alltest__none");
        if (allresault.current) allresault.current.classList.add("allres__open");

    }
    return (
        questions.length > 0 ? <section className='test__page'>


            <div className="min__height">



                <div className="testsection" ref={alltest}>
                    <h1 className='timer__ab' ref={timer__ab}>{formatTime(remainingTime)}</h1>



                    {questions?.map((quest, index) => {

                        return (
                            <div key={quest.id} className='test__test'>
                                {quest.file ? (
                                    <>
                                        {quest.file.endsWith(".mp3") || quest.file.endsWith(".wav") ? (
                                            <audio className='media__test' controls>
                                                <source src={`https://dev.edu-devosoft.uz/${quest.file}`} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        ) : quest.file.endsWith(".mp4") || quest.file.endsWith(".webm") ? (
                                            <video className='media__test' controls>
                                                <source src={`https://dev.edu-devosoft.uz/${quest.file}`} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : quest.file.endsWith(".jpg") || quest.file.endsWith(".png") || quest.file.endsWith(".jpeg") ? (
                                            <img className='media__test' src={`https://dev.edu-devosoft.uz/${quest.file}`} alt='' />
                                        ) : (
                                            <p>Fayl formati qo‘llab-quvvatlanmaydi.</p>
                                        )}
                                    </>
                                ) : null}

                                {
                                    quest?.text ? (
                                        <>
                                            <h3>{quest?.text.title}</h3>
                                            <p>{quest?.text.text}</p>
                                        </>
                                    ) : null
                                }
                                <h4> <span>{index + 1} </span>{quest.question}</h4>
                                <ul className='varyant'>
                                    {quest.option.map((item) => {
                                        return (
                                            <div key={item.id}>
                                                <label >

                                                    <input
                                                        value={item.id} type="radio" name={item.question_id} id=""
                                                        onChange={() => handleOptionChange(quest.id, item.id)}
                                                    />

                                                    <li key={item.id}> {item.option}</li>
                                                </label>
                                            </div>

                                        )
                                    })}
                                </ul>

                            </div>
                        )
                    })}


                    {
                        btn === true ? null :
                            <div className="end__button">
                                {nat_yak === true ?
                                    <button className='end__btn' onClick={() => SaveResul()} type="button">{chosenLang?.name}</button>
                                    :
                                    <button className='end__res' onClick={openResault}>{chosenLang?.name2}</button>

                                }
                            </div>
                    }
                </div>


                <div className="resault" ref={resault}>
                    <h4>{chosenLang?.res}</h4>
                    <div className="res__wrapper">
                        <h2>{chosenLang?.res2} <strong>"{level?.result}"</strong> </h2>
                        <p>{chosenLang?.res3} {formatTime(totaltime)} {chosenLang?.res4} {count} {chosenLang?.res5} {level?.score} {chosenLang?.res6}
                        </p>
                        <p>{chosenLang?.res7}</p>
                    </div>

                    <button onClick={closeResault}>Ok</button>
                    <button onClick={openAllresault}>{chosenLang?.allres}</button>
                </div>
                <div className="allresaultdiv" ref={allresault}>
    {merged?.map((item) => (
        <div key={item.id}>
            <h4>{item?.question}</h4>
            <div className="allres__wrapper">
            {item.correct_option_text}
            {item.is_correct ? (
                                    <img src={correctimg} alt="To‘g‘ri" width={30} />
                                ) : (
                                    <p style={{ color: 'red' }}>Noto‘g‘ri javob</p>
                                )}
            </div>
          
        </div>
    ))}
</div>


            </div>










        </section> : <div className="load">
            <span className="loader"></span>
        </div>
    )
}

export default StartTest