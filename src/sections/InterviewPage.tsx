/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    id: 1,
    category: "System Design",
    difficulty: "Hard",
    company: "Google",
    question:
      "Design a distributed rate limiter that handles 10M requests/second across multiple data centers. Consider consistency, availability, and partition tolerance.",
  },
  {
    id: 2,
    category: "Behavioral",
    difficulty: "Medium",
    company: "Meta",
    question:
      "Tell me about a time you had to make a critical decision with incomplete information. What was your process and what was the outcome?",
  },
  {
    id: 3,
    category: "Data Structures",
    difficulty: "Hard",
    company: "Amazon",
    question:
      "Given a stream of integers, design a data structure that supports: insert(val), delete(val), and getRandom() — all in O(1) time.",
  },
  {
    id: 4,
    category: "System Design",
    difficulty: "Medium",
    company: "Netflix",
    question:
      "How would you design YouTube's video upload and processing pipeline? Consider encoding, CDN distribution, and thumbnail generation.",
  },
];

const FEEDBACK_EXAMPLES = [
  {
    score: 87,
    strengths: ["Clear problem breakdown", "Mentioned Redis for distributed state", "Considered edge cases"],
    improve: ["Didn't mention CAP theorem trade-offs", "Could elaborate on failover strategy"],
    tip: "Mention consistency models (eventual vs strong) in system design answers.",
  },
  {
    score: 73,
    strengths: ["Good STAR format", "Showed ownership", "Quantified impact"],
    improve: ["Answer was too long", "Missing conflict resolution detail"],
    tip: "Keep behavioral answers under 3 minutes. Use metrics to show impact.",
  },
];

type Phase = "idle" | "thinking" | "answering" | "analyzing" | "feedback";

export default function InterviewPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState(FEEDBACK_EXAMPLES[0]);
  const [sessionScore, setSessionScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const question = QUESTIONS[currentQ % QUESTIONS.length];

  useEffect(() => {
    if (phase === "answering") {
      setTimeLeft(120);
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            handleSubmit();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  const startInterview = () => {
    setPhase("thinking");
    setTimeout(() => setPhase("answering"), 2200);
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("analyzing");
    setTimeout(() => {
      const fb = FEEDBACK_EXAMPLES[Math.floor(Math.random() * FEEDBACK_EXAMPLES.length)];
      setFeedback(fb);
      setSessionScore((prev) => prev + fb.score);
      setQuestionsAnswered((q) => q + 1);
      setPhase("feedback");
    }, 3000);
  };

  const nextQuestion = () => {
    setCurrentQ((q) => q + 1);
    setAnswer("");
    setPhase("thinking");
    setTimeout(() => setPhase("answering"), 2200);
  };

  const reset = () => {
    setPhase("idle");
    setAnswer("");
    setCurrentQ(0);
    setSessionScore(0);
    setQuestionsAnswered(0);
  };

  const timerPct = (timeLeft / 120) * 100;
  const timerColor = timeLeft > 60 ? "#22d3ee" : timeLeft > 30 ? "#f59e0b" : "#ef4444";

  return (
    <div className="min-h-screen bg-galaxy-bg pt-20 px-4 pb-10">
      {/* Header bar */}
      <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-galaxy-purple to-galaxy-cyan flex items-center justify-center text-xs font-bold font-mono">
            G
          </div>
          <span className="font-display font-bold text-white">Interview Session</span>
          {phase !== "idle" && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              LIVE
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {questionsAnswered > 0 && (
            <span className="text-galaxy-subtext text-sm font-mono">
              Avg: <span className="text-galaxy-cyan font-bold">{Math.round(sessionScore / questionsAnswered)}/100</span>
            </span>
          )}
          <button
            onClick={reset}
            className="text-galaxy-muted text-xs hover:text-white transition-colors font-mono border border-galaxy-border/40 px-3 py-1.5 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main panel */}
        <div className="lg:col-span-2 space-y-4">
          {/* Question card */}
          <motion.div
            layout
            className="glass rounded-2xl overflow-hidden border border-galaxy-purple/20"
          >
            {/* Chrome bar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-galaxy-border/30 bg-galaxy-secondary/50">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-galaxy-muted text-xs font-mono">galaxy-ai — interview</span>
              {phase === "answering" && (
                <div className="ml-auto flex items-center gap-2">
                  <svg viewBox="0 0 36 36" className="w-6 h-6 -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
                    <circle
                      cx="18" cy="18" r="14" fill="none"
                      stroke={timerColor} strokeWidth="2.5"
                      strokeDasharray={`${2 * Math.PI * 14}`}
                      strokeDashoffset={`${2 * Math.PI * 14 * (1 - timerPct / 100)}`}
                      style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }}
                    />
                  </svg>
                  <span className="text-xs font-mono" style={{ color: timerColor }}>
                    {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              {/* Idle */}
              {phase === "idle" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-galaxy-purple to-galaxy-cyan mx-auto mb-5 flex items-center justify-center text-3xl shadow-glow">
                    🎤
                  </div>
                  <h2 className="font-display font-bold text-2xl text-white mb-3">
                    Ready to practice?
                  </h2>
                  <p className="text-galaxy-subtext mb-8 max-w-sm mx-auto">
                    Our AI will ask you real interview questions. Answer in text, get scored instantly.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(124,58,237,0.6)" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={startInterview}
                    className="px-8 py-3.5 rounded-xl bg-linear-to-r from-galaxy-purple to-galaxy-indigo text-white font-semibold shadow-glow"
                  >
                    Start Interview →
                  </motion.button>
                </motion.div>
              )}

              {/* AI Thinking */}
              {phase === "thinking" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-10"
                >
                  <div className="flex gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-galaxy-purple to-galaxy-cyan flex-shrink-0 flex items-center justify-center text-xs font-bold font-mono shadow-glow">
                      AI
                    </div>
                    <div className="glass rounded-xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full bg-galaxy-violet"
                          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                      <span className="text-galaxy-subtext text-sm ml-1 font-mono">Selecting question...</span>
                    </div>
                  </div>

                  {/* Dim overlay feel */}
                  <div className="mt-6 p-4 rounded-xl bg-galaxy-purple/5 border border-galaxy-purple/15 flex items-center gap-3">
                    <motion.div
                      className="w-3 h-3 rounded-full bg-galaxy-purple"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-galaxy-muted text-xs font-mono">AI Thinking Mode — Preparing your question</span>
                  </div>
                </motion.div>
              )}

              {/* Question + Answer */}
              {(phase === "answering" || phase === "analyzing") && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  {/* Question meta */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-galaxy-purple/20 text-galaxy-violet border border-galaxy-purple/30">
                      {question.category}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono border ${
                      question.difficulty === "Hard"
                        ? "bg-red-500/10 text-red-400 border-red-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}>
                      {question.difficulty}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-galaxy-secondary text-galaxy-subtext border border-galaxy-border/40">
                      {question.company}
                    </span>
                  </div>

                  {/* AI message */}
                  <div className="flex gap-3 mb-5">
                    <div className="w-9 h-9 rounded-xl bg-linear-to-br from-galaxy-purple to-galaxy-cyan flex-shrink-0 flex items-center justify-center text-xs font-bold font-mono shadow-glow">
                      AI
                    </div>
                    <div className="glass rounded-xl rounded-tl-none px-4 py-3 text-sm text-galaxy-text leading-relaxed">
                      {question.question}
                    </div>
                  </div>

                  {/* Answer textarea */}
                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      disabled={phase === "analyzing"}
                      placeholder="Type your answer here... Think out loud, structure your thoughts."
                      rows={6}
                      className="w-full glass rounded-xl px-4 py-3 text-sm text-galaxy-text placeholder:text-galaxy-muted resize-none outline-none focus:border-galaxy-purple/50 transition-colors font-body disabled:opacity-60"
                    />
                    <div className="absolute bottom-3 right-3 text-xs font-mono text-galaxy-muted">
                      {answer.length} chars
                    </div>
                  </div>

                  {phase === "answering" && (
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => setIsRecording(!isRecording)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                          isRecording
                            ? "bg-red-500/20 border border-red-500/40 text-red-400"
                            : "glass text-galaxy-subtext hover:text-white"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${isRecording ? "bg-red-400 animate-pulse" : "bg-galaxy-muted"}`} />
                        {isRecording ? "Recording..." : "Voice Input"}
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSubmit}
                        disabled={answer.trim().length < 20}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-galaxy-purple to-galaxy-indigo text-white text-sm font-semibold shadow-glow disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        Submit Answer →
                      </motion.button>
                    </div>
                  )}

                  {phase === "analyzing" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-galaxy-purple/10 border border-galaxy-purple/20"
                    >
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-galaxy-violet"
                            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-mono text-galaxy-violet">AI analyzing your answer...</span>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Feedback */}
              {phase === "feedback" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  {/* Score */}
                  <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-galaxy-secondary/50 border border-galaxy-border/30">
                    <div className="relative w-16 h-16">
                      <svg viewBox="0 0 60 60" className="-rotate-90 w-16 h-16">
                        <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                        <motion.circle
                          cx="30" cy="30" r="24" fill="none"
                          stroke={feedback.score >= 80 ? "#22d3ee" : feedback.score >= 60 ? "#a78bfa" : "#f59e0b"}
                          strokeWidth="4"
                          strokeDasharray={`${2 * Math.PI * 24}`}
                          initial={{ strokeDashoffset: `${2 * Math.PI * 24}` }}
                          animate={{ strokeDashoffset: `${2 * Math.PI * 24 * (1 - feedback.score / 100)}` }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold font-mono text-white">{feedback.score}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-semibold font-display">
                        {feedback.score >= 80 ? "🌟 Excellent!" : feedback.score >= 60 ? "✅ Good Answer" : "📈 Keep Practicing"}
                      </div>
                      <div className="text-galaxy-subtext text-sm mt-0.5">
                        {question.category} · {question.company}
                      </div>
                    </div>
                  </div>

                  {/* Strengths */}
                  <div className="mb-4">
                    <p className="text-xs font-mono text-green-400 mb-2 flex items-center gap-1.5">
                      <span>✓</span> Strengths
                    </p>
                    <ul className="space-y-1.5">
                      {feedback.strengths.map((s) => (
                        <li key={s} className="text-sm text-galaxy-text flex items-start gap-2">
                          <span className="text-green-400 mt-0.5 shrink-0">✓</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improve */}
                  <div className="mb-4">
                    <p className="text-xs font-mono text-amber-400 mb-2">⚠ Improve</p>
                    <ul className="space-y-1.5">
                      {feedback.improve.map((s) => (
                        <li key={s} className="text-sm text-galaxy-subtext flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5 shrink-0">→</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* AI Tip */}
                  <div className="p-3.5 rounded-xl bg-galaxy-purple/10 border border-galaxy-purple/20 mb-5">
                    <p className="text-xs font-mono text-galaxy-violet mb-1">🧠 AI Tip</p>
                    <p className="text-sm text-galaxy-subtext">{feedback.tip}</p>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={nextQuestion}
                      className="flex-1 py-3 rounded-xl bg-linear-to-r from-galaxy-purple to-galaxy-indigo text-white font-semibold text-sm shadow-glow"
                    >
                      Next Question →
                    </motion.button>
                    <button
                      onClick={reset}
                      className="px-5 py-3 rounded-xl glass text-galaxy-subtext text-sm hover:text-white transition-colors"
                    >
                      End Session
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Session stats */}
          <div className="glass rounded-2xl p-5 border border-galaxy-border/30">
            <p className="text-xs font-mono text-galaxy-muted uppercase tracking-widest mb-4">Session Stats</p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-galaxy-subtext text-sm">Questions</span>
                <span className="text-white font-mono font-medium">{questionsAnswered}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-galaxy-subtext text-sm">Avg Score</span>
                <span className="text-galaxy-cyan font-mono font-medium">
                  {questionsAnswered > 0 ? Math.round(sessionScore / questionsAnswered) : "—"}/100
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-galaxy-subtext text-sm">Track</span>
                <span className="text-galaxy-violet font-mono text-sm">Mixed</span>
              </div>
            </div>
          </div>

          {/* Question list */}
          <div className="glass rounded-2xl p-5 border border-galaxy-border/30">
            <p className="text-xs font-mono text-galaxy-muted uppercase tracking-widest mb-4">Question Queue</p>
            <div className="space-y-2.5">
              {QUESTIONS.map((q, i) => (
                <div
                  key={q.id}
                  className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                    i === currentQ % QUESTIONS.length
                      ? "bg-galaxy-purple/20 border border-galaxy-purple/30"
                      : "opacity-40"
                  }`}
                >
                  <span className="text-xs font-mono text-galaxy-muted w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-galaxy-text truncate">{q.category}</p>
                    <p className="text-xs text-galaxy-muted">{q.company} · {q.difficulty}</p>
                  </div>
                  {i === currentQ % QUESTIONS.length && (
                    <span className="w-1.5 h-1.5 rounded-full bg-galaxy-cyan animate-pulse shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="glass rounded-2xl p-5 border border-galaxy-purple/20">
            <p className="text-xs font-mono text-galaxy-violet mb-3">💡 Quick Tips</p>
            <ul className="space-y-2 text-xs text-galaxy-subtext">
              <li className="flex gap-2"><span className="text-galaxy-violet">→</span> Structure with: Clarify → Design → Trade-offs</li>
              <li className="flex gap-2"><span className="text-galaxy-violet">→</span> Think out loud always</li>
              <li className="flex gap-2"><span className="text-galaxy-violet">→</span> Use STAR for behavioral</li>
              <li className="flex gap-2"><span className="text-galaxy-violet">→</span> Mention scalability numbers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}