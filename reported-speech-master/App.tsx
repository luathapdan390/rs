
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { SectionHeader } from './components/SectionHeader';
import { FormulaBox } from './components/FormulaBox';
import { Quiz } from './components/Quiz';
import { PRINCIPLES, TENSE_RULES, ADVERB_RULES, TO_V_VERBS, VING_VERBS, EXCEPTIONS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'poster' | 'quiz'>('poster');
  const [directSpeech, setDirectSpeech] = useState('');
  const [reportedResult, setReportedResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePractice = async () => {
    if (!directSpeech.trim()) return;
    setLoading(true);
    setReportedResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Convert this direct speech to reported speech in English and provide a brief explanation in Vietnamese about the changes (tenses, pronouns, adverbs). Sentence: "${directSpeech}"`,
        config: {
          systemInstruction: "You are an English Grammar Expert. Format your response clearly. Show the Reported Speech version first, then 'Giải thích' bullet points.",
          temperature: 0.7,
        },
      });
      setReportedResult(response.text || "Could not generate response.");
    } catch (error) {
      console.error(error);
      setReportedResult("Error: Unable to connect to AI assistant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-0">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* TAB NAVIGATION */}
        <nav className="flex bg-white p-2 rounded-2xl shadow-md border border-gray-200">
          <button 
            onClick={() => setActiveTab('poster')}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'poster' ? 'bg-[#2C3E50] text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            POSTER CÔNG THỨC
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'quiz' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            150 BÀI TẬP
          </button>
        </nav>

        {activeTab === 'poster' ? (
          <div className="bg-white poster-card rounded-2xl overflow-hidden animate-in fade-in duration-500">
            {/* HEADER */}
            <header className="bg-[#2C3E50] text-white py-12 px-6 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              </div>
              <p className="uppercase tracking-[0.2em] text-blue-200 text-sm font-semibold mb-2">English Grammar Poster</p>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                TỔNG HỢP CÔNG THỨC:<br/>
                <span className="text-blue-400">CÂU TƯỜNG THUẬT</span>
              </h1>
              <p className="text-gray-300 text-lg">Master Reported Speech (Indirect Speech) with ease</p>
            </header>

            <div className="p-6 md:p-12 space-y-16">
              {/* SECTION I: 3 PRINCIPLES */}
              <section>
                <SectionHeader number="I" title="3 NGUYÊN TẮC CHUYỂN ĐỔI" colorClass="text-purple-600" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PRINCIPLES.map((p, i) => (
                    <div key={i} className="bg-purple-50 p-6 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-colors">
                      <h3 className="font-bold text-purple-700 mb-2">{p.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{p.description}</p>
                      <div className="bg-white px-3 py-2 rounded-lg text-xs font-mono text-purple-800 border border-purple-100">
                        {p.example}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION II: RULES TABLES */}
              <section>
                <SectionHeader number="II" title="QUY TẮC LÙI THÌ & ĐỔI TRẠNG TỪ" colorClass="text-orange-600" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                       <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                       THAY ĐỔI THÌ (TENSES)
                    </h3>
                    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-orange-50 text-orange-800 text-xs uppercase">
                          <tr>
                            <th className="p-3 border-b">Trực tiếp</th>
                            <th className="p-3 border-b">Tường thuật</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {TENSE_RULES.map((rule, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 border-b">
                              <td className="p-3 text-gray-600">{rule.from}</td>
                              <td className="p-3 font-semibold text-orange-700">{rule.to}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                       <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                       THAY ĐỔI TRẠNG TỪ (ADVERBS)
                    </h3>
                    <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead className="bg-orange-50 text-orange-800 text-xs uppercase">
                          <tr>
                            <th className="p-3 border-b">Trực tiếp</th>
                            <th className="p-3 border-b">Tường thuật</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {ADVERB_RULES.map((rule, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 border-b">
                              <td className="p-3 text-gray-600">{rule.from}</td>
                              <td className="p-3 font-semibold text-orange-700">{rule.to}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION III: SENTENCE TYPES */}
              <section>
                <SectionHeader number="III" title="CÁC LOẠI CÂU (TYPES OF SENTENCES)" colorClass="text-blue-600" />
                <div className="space-y-4">
                  <FormulaBox title="1. Câu kể (STATEMENTS)" formula="S + said/told (sb) + (that) + S + V(lùi thì)" bgColor="bg-blue-50" borderColor="border-blue-500" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormulaBox title="2. Câu hỏi Yes/No" formula="S + asked (sb) + if/whether + S + V(lùi thì)" bgColor="bg-blue-50" borderColor="border-blue-400" />
                    <FormulaBox title="3. Câu hỏi Wh-Questions" formula="S + asked (sb) + Wh-word + S + V(lùi thì)" bgColor="bg-blue-50" borderColor="border-blue-400" />
                  </div>
                </div>
              </section>

              {/* AI ASSISTANT */}
              <section className="bg-gray-800 text-white p-8 rounded-2xl shadow-xl">
                 <h2 className="text-2xl font-bold text-blue-400 mb-4">HỎI GIẢI THÍCH VỚI AI</h2>
                 <div className="flex gap-2">
                   <input 
                     type="text" 
                     value={directSpeech}
                     onChange={(e) => setDirectSpeech(e.target.value)}
                     placeholder="Ví dụ: 'I am hungry', he said..."
                     className="flex-1 bg-gray-700 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-white"
                   />
                   <button onClick={handlePractice} disabled={loading || !directSpeech} className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-xl font-bold transition-all">
                     {loading ? "..." : "XỬ LÝ"}
                   </button>
                 </div>
                 {reportedResult && (
                   <div className="mt-6 p-4 bg-gray-900 rounded-xl border border-gray-700 text-sm text-gray-300 whitespace-pre-wrap">
                      {reportedResult}
                   </div>
                 )}
              </section>
            </div>

            <footer className="bg-gray-50 border-t py-8 px-6 text-center">
               <p className="text-gray-500 text-sm mb-1 italic">Make with ❤️ by Gemini AI</p>
            </footer>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <Quiz />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
