import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      //Cleanup function!!!
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return <div className="timer">{formatSeconds(secondsRemaining)}</div>;
}

function formatSeconds(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  console.log(sec);
  return `${min < 10 ? 0 : ""}${min}:${sec < 10 ? 0 : ""}${sec}`;
}

export default Timer;
