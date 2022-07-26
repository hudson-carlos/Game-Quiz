import { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import TodoContext from "../TodoContext";
import style from "../style/Answers.module.css";

export default function Answer() {
  const { 
    indexAnswers,
    answersAll,
    selectedAnswer,
    setAnswersAll,
    setSelectedAnswer, 
  } = useContext(TodoContext);

  function answerSelected(answer, index) {
    const auxAnswers = answersAll;

    // adicionado "Selected: answer" para todas as perguntas 
    auxAnswers[indexAnswers].forEach((_, i) => {
      auxAnswers[indexAnswers][i].selected = "answer";
    });

    // Adicionadno "Selected: 'selected'" para a pegunta clicada
    auxAnswers[indexAnswers][index].selected = "selected";

    // setando novo arrray de perguntas 
    setAnswersAll(auxAnswers);

    // Setando nova pegunta selecionada 
    setSelectedAnswer(answer)
  }
  
  return (
    <ListGroup>
      {answersAll[indexAnswers].map(({ answer}, index) => (
        <ListGroup.Item
          className={
            style[answersAll[indexAnswers][index].selected]
          }
          action 
          variant="info"
          key={index}
          onClick={({currentTarget}) => {
            answerSelected(answer, index)
          }} 
        >
          {answer}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
