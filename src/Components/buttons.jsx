import { useContext, useRef, useEffect } from "react";
import { Button } from 'react-bootstrap';
import TodoContext from "../TodoContext";
import style from '../style/Game.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Buttons() {
  const { 
    data, 
    setQuestion, 
    setIndexAnswers,
    indexAnswers,
    answersAll,
    setResults,
    setEnd,
    setLoading, 
  } = useContext(TodoContext);

  const previusRef = useRef();
  const nextRef = useRef();
  const submitRef = useRef();

  function visibilityButton(ref, num) {
    if(ref.current) {
      if (indexAnswers === num) {
        ref.current.style.display = "none"; 
      }
      else {
        ref.current.style.display = "inline";
      }
    }
  }

  function visibilityButtonSubmit(ref, position) {
    if(ref.current) {
      if(indexAnswers === position) ref.current.style.display = "inline";
      else ref.current.style.display = "none";
    }
  }

  function correctAnswer(index) {
    const answers = data[index].correct_answers;
    const keyCorrect = Object.keys(answers).find(key => answers[key] === 'true')
    .replace("_correct", "");

    return data[index].answers[keyCorrect];
  }

  function report() {
    const answersSelected = [];
    answersAll.forEach(arr => {
      arr.forEach(({ selected, key, index, answer }) => {
        if(selected === "selected") answersSelected.push({ 
          answerCorrect: correctAnswer(index), 
          answerSelected: key,
          answer,
          questiom: data[index].question
        });
      });
    });
    
    setResults(answersSelected);
    setEnd(true);
    setLoading(false);
  }

  useEffect(() => {
    const firstQuestion = 0;
    const lastQuestion = 9;

    visibilityButton(previusRef, firstQuestion);
    visibilityButton(nextRef, lastQuestion);
    visibilityButtonSubmit(submitRef, lastQuestion);
  }, [indexAnswers]);

  return (
    <div className={style.buttons}>
      <Button
        type="submit"
        ref={nextRef} 
        onClick={() => {
          setQuestion(data[indexAnswers + 1].question);
          setIndexAnswers(indexAnswers + 1);
        }}
      >Next</Button>

      <Button
        type="submit"
        style={{
          display: "none"
        }}
        ref={submitRef}
        onClick={() => report()}
      >Submit</Button>

      <Button
        type="submit"
        style={{
          display: "inline",
        }}
        ref={previusRef}
        onClick={() => {
          setQuestion(data[indexAnswers - 1].question);
          setIndexAnswers(indexAnswers - 1);
        }}
      >Previus</Button>
    </div>
  );
}
