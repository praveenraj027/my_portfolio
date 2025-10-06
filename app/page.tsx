"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingPage() {
  const router = useRouter();
  const [stage, setStage] = useState<"boot" | "terminal">("boot");
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const logs = [
      "Initializing system modules...",
      "Loading developer environment...",
      "Connecting to portfolio server...",
      "Fetching assets...",
      "System ready.",
    ];

    let i = 0;
    const interval = setInterval(() => {
      setBootLines((prev) => [...prev, logs[i]]);
      i++;
      if (i === logs.length) {
        clearInterval(interval);
        setTimeout(() => setStage("terminal"), 800);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCursorVisible((v) => !v);
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);

  const typeError = (message: string) => {
    // Clear old message first
    setErrorMessage("");

    // Ensure we start cleanly before typing
    let index = 0;

    const startTyping = () => {
      if (message.length > 0) {
        // Immediately show the first character
        setErrorMessage(message.charAt(0));
        index = 1;

        const interval = setInterval(() => {
          if (index < message.length) {
            setErrorMessage((prev) => prev + message.charAt(index));
            index++;
          } else {
            clearInterval(interval);
          }
        }, 40);
      }
    };

    // Small delay to ensure the reset render finishes
    setTimeout(startTyping, 30);
  };


  const handleCommand = () => {
    const command = input.trim().toLowerCase();

    if (command === "run portfolio" || command === "") {
      setHasSubmitted(true);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          sessionStorage.setItem("visited", "true");
          router.push("/home");
        }, 1000);
      }, 800);
    } else {
      typeError(`>>>> Error: Invalid command "${input}" undefined`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCommand();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono px-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md"
        >
          <p className="text-sm mb-4 text-gray-400">Developer Terminal v1.0</p>

          <div className="bg-[#0d0d0d] p-4 rounded-lg border border-green-700 shadow-lg min-h-[250px] sm:min-h-[300px] overflow-hidden">
            {stage === "boot" ? (
              <div className="text-green-400 text-sm space-y-1">
                {bootLines.map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
                {cursorVisible && <p>▮</p>}
              </div>
            ) : !hasSubmitted ? (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col  text-lg w-full sm:w-auto relative">
                  <span className="text-green-500">praveenrajak@portfolio-$&nbsp;</span>

                  {/* Input display as spans */}
                  <div className="flex-1 flex flex-wrap items-center bg-transparent min-h-[24px]">
                    {input.split("").map((char, index) => (
                      <span key={index} className="text-green-400">
                        {char}
                      </span>
                    ))}

                    {cursorVisible && <span className="text-green-400 font-bold">▮</span>}
                  </div>

                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="absolute inset-0 opacity-0 w-full h-full caret-transparent"
                    placeholder="run portfolio"
                  />
                </div>

                <div>

                </div>
                {/* Animated error message */}
                {errorMessage && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errorMessage}
                  </motion.p>
                )}

                {/* Run button for mobile users */}
                <div className="w-full flex justify-center py-10">
                  <button
                    onClick={handleCommand}
                    className="sm:hidden mt-2 bg-green-700 hover:bg-green-600 text-black font-semibold py-1.5 rounded-lg w-[50%] transition-colors duration-200"
                  >
                    ▶ Run
                  </button>
                </div>
              </div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-green-400"
              >
                Running portfolio...
              </motion.p>
            )}
          </div>
        </motion.div>

        {stage === "terminal" && !hasSubmitted && (
          <p className="flex flex-wrap text-xs text-gray-500 mt-6 text-center justify-center">
            Type <span className="text-green-500 mx-1">run portfolio</span> and press Enter
            <span className="sm:hidden">&nbsp;(or tap Run)&nbsp;</span> to continue
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
