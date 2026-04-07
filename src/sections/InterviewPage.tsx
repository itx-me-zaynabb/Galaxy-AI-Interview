/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GalaxyScene from "./GalaxyScene";

type Phase = "idle" | "thinking" | "answering" | "analyzing" | "feedback";

const QUESTIONS = [
  {
    id: 1,
    category: "System Design",
    difficulty: "Hard",
    company: "Google",
    question: "Design a distributed rate limiter at scale.",
  },
  {
    id: 2,
    category: "Behavioral",
    difficulty: "Medium",
    company: "Meta",
    question: "Tell me about a tough decision you made.",
  },
];

export default function InterviewPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const recognition = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const question = QUESTIONS[currentQ];

  // 🎤 Voice
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new (window as any).webkitSpeechRecognition();
      recognition.current.continuous = true;

      recognition.current.onresult = (e: any) => {
        const text = Array.from(e.results)
          .map((r: any) => r[0].transcript)
          .join("");
        setAnswer(text);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (!recognition.current) return;
    isRecording
      ? recognition.current.stop()
      : recognition.current.start();
    setIsRecording(!isRecording);
  };

  // ⏱ Timer with auto submit
  useEffect(() => {
    if (phase === "answering") {
      setTimeLeft(120);
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            handleSubmit();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  // 🖱 Cursor glow
  useEffect(() => {
    const move = (e: MouseEvent) =>
      setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const start = () => {
    setPhase("thinking");
    setTimeout(() => setPhase("answering"), 1500);
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    setPhase("analyzing");

    setTimeout(() => {
      const randomScore = Math.floor(60 + Math.random() * 40);
      setScore((prev) => prev + randomScore);
      setAnswered((prev) => prev + 1);
      setPhase("feedback");
    }, 2000);
  };

  const nextQuestion = () => {
    setCurrentQ((q) => (q + 1) % QUESTIONS.length);
    setAnswer("");
    start();
  };

  const reset = () => {
    setPhase("idle");
    setAnswer("");
    setCurrentQ(0);
    setScore(0);
    setAnswered(0);
  };

  const avg = answered ? Math.round(score / answered) : 0;

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <GalaxyScene />

      {/* Cursor Glow */}
      <div
        className="fixed pointer-events-none w-72 h-72 blur-3xl opacity-20"
        style={{
          left: pos.x - 150,
          top: pos.y - 150,
          background: "radial-gradient(circle, #7c3aed, transparent)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto pt-20 px-4">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">AI Interview</h1>

          <div className="flex items-center gap-4 text-sm">
            {answered > 0 && (
              <span>Avg: {avg}/100</span>
            )}
            <button onClick={reset} className="text-red-400">
              Reset
            </button>
          </div>
        </div>

        {/* TIMER */}
        {phase === "answering" && (
          <div className="mb-4">
            <div className="h-2 bg-white/10 rounded">
              <div
                className="h-2 bg-cyan-400 rounded"
                style={{ width: `${(timeLeft / 120) * 100}%` }}
              />
            </div>
            <p className="text-xs mt-1 text-gray-400">
              {timeLeft}s left
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="glass p-6 rounded-2xl"
          >

            {/* IDLE */}
            {phase === "idle" && (
              <div className="text-center">
                <h2 className="text-2xl mb-6">
                  Practice Like Real Interview
                </h2>
                <button
                  onClick={start}
                  className="px-6 py-3 bg-purple-600 rounded-xl"
                >
                  Start Interview
                </button>
              </div>
            )}

            {/* THINKING */}
            {phase === "thinking" && (
              <div className="text-center py-10">
                <motion.div
                  className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-cyan-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <p className="mt-4">AI selecting question...</p>
              </div>
            )}

            {/* ANSWERING */}
            {phase === "answering" && (
              <>
                <div className="mb-3 text-xs opacity-70">
                  {question.category} • {question.company}
                </div>

                <p className="mb-4 text-lg">{question.question}</p>

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-3 rounded bg-black/30"
                  rows={5}
                />

                <div className="flex justify-between mt-4">
                  <button onClick={toggleRecording}>
                    {isRecording ? "Recording..." : "Voice"}
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    disabled={answer.length < 10}
                    className="px-4 py-2 bg-purple-600 rounded disabled:opacity-40"
                  >
                    Submit
                  </motion.button>
                </div>
              </>
            )}

            {/* ANALYZING */}
            {phase === "analyzing" && (
              <p className="text-center">AI analyzing your answer...</p>
            )}

            {/* FEEDBACK */}
            {phase === "feedback" && (
              <div className="text-center">
                <h2 className="text-3xl mb-2">Score</h2>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-5xl font-bold text-cyan-400 mb-4"
                >
                  {avg}
                </motion.div>

                <p className="mb-6 text-gray-400">
                  Strong structure, but improve clarity.
                </p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={nextQuestion}
                    className="px-5 py-2 bg-purple-600 rounded"
                  >
                    Next Question
                  </button>

                  <button
                    onClick={reset}
                    className="px-5 py-2 border border-white/20 rounded"
                  >
                    End Session
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}