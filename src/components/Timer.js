import { useEffect } from "react";

function Timer({ dispatch, seconds }) {
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
  return <div className="timer">{secondsToMinutes(seconds)}</div>;
}

function secondsToMinutes(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds - min * 60;
  console.log(min, sec);
  return `${min}:${sec}`;
}

export default Timer;
