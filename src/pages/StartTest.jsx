import React, {  useEffect, useReducer, useRef, useState } from 'react'
import '../styles/test.css'
import { useNavigate } from 'react-router-dom'

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
            return [...filtered, { question_id: questionId, option_id: optionId }];
        });
        setBtn(false)
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




        resault.current.classList.add("resault__open");
        timer__ab.current.classList.add("none");



    }

    function closeResault() {

        navigate("/")
    }



    useEffect(() => {
        const handleScroll = () => {

            if (window.scrollY >= 10) {
                timer__ab.current.classList.add('fixed-timer');
            } else {
                timer__ab.current.classList.remove('fixed-timer');
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    
    const [btn, setBtn]= useState(true)
    let count = +localStorage.getItem("count")



    return (
        questions.length > 0 ? <section className='test__page'>

         
                <div className="min__height">



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
                                ): null
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
                        <button className='end__btn' onClick={() => SaveResul()} type="button">Yakunlash</button>
                        :
                        <button className='end__res' onClick={openResault}>Natijani ko'rish</button>

                    }
                </div>
                   }


                    <div className="resault" ref={resault}>
                        <h4>Marhamat natijangizni ko'rishingiz mumkun</h4>
                        <div className="res__wrapper">
                            <h2>Sizning darajangiz <strong>"{level?.result}"</strong> </h2>
                            <p>Siz bu testni {formatTime(totaltime)} daqiqada ishlab  tugatdingiz va
                                Siz {count} ta savoldan {level?.score} tasiga to'gri javob berdingiz.
                            </p>
                            <p>Sizga adminlarimiz bog'lanishadi, Iltimos kuting...</p>
                        </div>
                        <button onClick={closeResault}>Ok</button>
                    </div>


                </div>
            









        </section> : <div className="load">
            <span className="loader"></span>
        </div>
    )
}

export default StartTest