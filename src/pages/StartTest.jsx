import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function StartTest() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [remainingTime, setRemainingTime] = useState(0);

  const intervalRef = useRef(null);

  /* ================== FETCH QUESTIONS + TIME ================== */
  useEffect(() => {
    async function fetchTest() {
      const res = await fetch(
        `https://dev.edu-devosoft.uz/api/test/${localStorage.getItem("choosen_test_id")}`
      );
      const json = await res.json();

      setQuestions(json.questions || []);
      setRemainingTime(json.time * 60);

      localStorage.setItem("start_time", new Date().toISOString());
    }

    fetchTest();
  }, []);

  /* ================== TIMER ================== */
  useEffect(() => {
    if (remainingTime <= 0) return;

    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [remainingTime]);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  /* ================== ANSWER SELECT ================== */
  const selectOption = (questionId, optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleWritingChange = (questionId, value) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  /* ================== SAVE RESULT ================== */
  const finishTest = async () => {
    clearInterval(intervalRef.current);

    const customerTestBody = {
      customer_id: +localStorage.getItem("customerId"),
      test_id: +localStorage.getItem("choosen_test_id"),
      started_at: localStorage.getItem("start_time"),
      finished_at: new Date().toISOString(),
      school_id: 6,
    };

    const res = await fetch(
      "https://dev.edu-devosoft.uz/api/customer-test/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerTestBody),
      }
    );

    const json = await res.json();
    const customer_test_id = json?.customer_test?.id;

    if (!customer_test_id) return alert("Xatolik!");

    const answersPayload = questions
      .map((q) => {
        if (q.type === "test") {
          return {
            question_id: q.id,
            option_id: selectedAnswers[q.id],
            customer_test_id,
          };
        }

        if (q.type === "writing") {
          return {
            question_id: q.id,
            text: selectedAnswers[q.id],
            customer_test_id,
          };
        }

        return null;
      })
      .filter(Boolean);

    await fetch("https://dev.edu-devosoft.uz/api/customer-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ list: answersPayload }),
    });

    navigate("/");
  };

  if (!questions.length)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ================= HEADER ================= */}
      <div className="sticky top-0 bg-white z-50 border-b px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="font-bold text-[#2D3494]">
            Savol {currentIndex + 1} / {questions.length}
          </div>
          <div className="font-mono text-lg text-red-600">
            {formatTime(remainingTime)}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-3 h-2 bg-slate-200 rounded">
          <div
            className="h-full bg-gradient-to-r from-[#2D3494] to-[#4351DB] rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ================= QUESTION ================= */}
      <div className="flex-grow flex items-center justify-center px-6">
        <div className="max-w-3xl w-full bg-white rounded-3xl p-8 shadow">
          <h2 className="text-2xl font-extrabold mb-8">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {/* ===== TEST ===== */}
            {currentQuestion.type === "test" &&
              currentQuestion.option.map((opt, i) => (
                <button
                  key={opt.id}
                  onClick={() => selectOption(currentQuestion.id, opt.id)}
                  className={`w-full p-5 rounded-2xl border-2 flex justify-between items-center transition ${
                    selectedAnswers[currentQuestion.id] === opt.id
                      ? "border-[#2D3494] bg-blue-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="font-bold">
                    {String.fromCharCode(65 + i)}. {opt.option}
                  </span>
                  {selectedAnswers[currentQuestion.id] === opt.id && (
                    <span className="w-6 h-6 bg-[#2D3494] rounded-full" />
                  )}
                </button>
              ))}

            {/* ===== WRITING ===== */}
            {currentQuestion.type === "writing" && (
              <textarea
                placeholder="Javobingizni shu yerga yozing..."
                value={selectedAnswers[currentQuestion.id] || ""}
                onChange={(e) =>
                  handleWritingChange(currentQuestion.id, e.target.value)
                }
                className="w-full min-h-[160px] p-5 border-2 border-slate-300 rounded-2xl focus:outline-none focus:border-[#2D3494]"
              />
            )}
          </div>
        </div>
      </div>

      {/* ================= NAV ================= */}
      <div className="flex justify-between px-6 py-6 max-w-5xl mx-auto w-full">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((p) => p - 1)}
          className="px-8 py-3 rounded-xl bg-white border disabled:opacity-40"
        >
          Oldingi
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={finishTest}
            className="px-10 py-3 rounded-xl bg-red-600 text-white font-bold"
          >
            Yakunlash
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex((p) => p + 1)}
            className="px-10 py-3 rounded-xl bg-[#2D3494] text-white font-bold"
          >
            Keyingisi
          </button>
        )}
      </div>
    </div>
  );
}

export default StartTest;
