
import React, { useState } from 'react';
import { QUESTIONS } from '../questions';
import { Question } from '../types';

export const Quiz: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [showScore, setShowScore] = useState(false);

  const QUESTIONS_PER_PAGE = 10;
  const totalPages = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);
  const currentQuestions = QUESTIONS.slice(currentPage * QUESTIONS_PER_PAGE, (currentPage + 1) * QUESTIONS_PER_PAGE);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const checkAnswer = (questionId: number) => {
    setCheckedQuestions(prev => ({ ...prev, [questionId]: true }));
  };

  const calculateScore = () => {
    let correct = 0;
    QUESTIONS.forEach(q => {
      const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
      const correctAns = q.correctAnswer.toLowerCase();
      if (userAns === correctAns) {
        correct++;
      }
    });
    return ((10 * correct) / QUESTIONS.length).toFixed(1);
  };

  const isCorrect = (q: Question) => {
    const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
    const correctAns = q.correctAnswer.toLowerCase();
    return userAns === correctAns;
  };

  if (showScore) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-xl p-8 border-4 border-blue-500">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-4">KẾT QUẢ CỦA BẠN</h2>
        <div className="text-8xl font-black text-gray-800 mb-6">{calculateScore()} / 10</div>
        <p className="text-xl text-gray-600 mb-10">
          Bạn đã trả lời đúng {Object.values(QUESTIONS).filter((q, i) => isCorrect(q)).length} trên {QUESTIONS.length} câu.
        </p>
        <button 
          onClick={() => { setShowScore(false); setCurrentPage(0); setUserAnswers({}); setCheckedQuestions({}); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg"
        >
          LÀM LẠI TỪ ĐẦU
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">150 BÀI TẬP REPORTED SPEECH</h2>
          <p className="text-blue-100 text-sm">Trang {currentPage + 1} / {totalPages} • Tổng {QUESTIONS.length} câu</p>
        </div>
        <button 
          onClick={() => { if(window.confirm('Bạn muốn nộp bài ngay?')) setShowScore(true); }}
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-md"
        >
          NỘP BÀI
        </button>
      </div>

      <div className="space-y-6">
        {currentQuestions.map((q, idx) => {
          const isChecked = checkedQuestions[q.id];
          const correct = isChecked && isCorrect(q);

          return (
            <div key={q.id} className={`p-6 bg-white rounded-xl shadow-sm border-2 transition-all ${isChecked ? (correct ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50') : 'border-gray-100'}`}>
              <div className="flex items-start gap-4">
                <span className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-500 flex-shrink-0">
                  {q.id}
                </span>
                <div className="flex-1 space-y-4">
                  <p className="text-gray-800 font-semibold text-lg">{q.content}</p>

                  {q.type === 'multiple-choice' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {q.options?.map((opt, i) => (
                        <label key={i} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:bg-gray-50 ${userAnswers[q.id] === opt ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200'}`}>
                          <input 
                            type="radio" 
                            name={`q-${q.id}`} 
                            checked={userAnswers[q.id] === opt}
                            onChange={() => handleAnswerChange(q.id, opt)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="text-sm font-medium text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input 
                      type="text" 
                      placeholder="Nhập câu trả lời của bạn..."
                      value={userAnswers[q.id] || ''}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  )}

                  <div className="flex items-center justify-between">
                    {!isChecked ? (
                      <button 
                        onClick={() => checkAnswer(q.id)}
                        disabled={!userAnswers[q.id]}
                        className="text-sm font-bold text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                      >
                        KIỂM TRA CÂU NÀY
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        {correct ? (
                          <span className="text-green-600 font-bold flex items-center gap-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            ĐÚNG
                          </span>
                        ) : (
                          <span className="text-red-600 font-bold flex items-center gap-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                            SAI
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <button 
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(p => p - 1)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 hover:text-blue-600 disabled:opacity-30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          TRANG TRƯỚC
        </button>
        <span className="text-sm text-gray-500 font-medium">Trang {currentPage + 1} / {totalPages}</span>
        <button 
          disabled={currentPage === totalPages - 1}
          onClick={() => setCurrentPage(p => p + 1)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 hover:text-blue-600 disabled:opacity-30"
        >
          TRANG TIẾP
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  );
};
