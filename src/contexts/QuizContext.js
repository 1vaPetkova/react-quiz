import { createContext, useContext, useReducer, useEffect } from "react";
import { qna } from "../Q&A.js";

const QuizContext = createContext();

const SECONDS_PER_QUESTION = 15;
const initialState = {
  questions: [],
  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      const q = qna.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          q.correctOption === action.payload
            ? state.points + q.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index++, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: Math.max(state.highscore, state.points),
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        highscore: state.highscore,
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action was not recognised!");
  }
}

function QuizProvider({ children }) {
  const [
    { status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const count = qna.length;
  const maxPoints = qna.reduce((prev, current) => prev + current.points, 0);
  const question = qna.at(index);

  useEffect(function () {
    fetch("http://localhost:8001/questions")
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <QuizContext.Provider
      value={{
        question,
        status,
        index,
        answer,
        points,
        count,
        maxPoints,
        highscore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("Quiz context is used outside the Cities Provider!");
  }
  return context;
}
export { QuizProvider, useQuiz };
