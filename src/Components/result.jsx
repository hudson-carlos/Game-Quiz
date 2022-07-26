import { useContext } from "react";
import { Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TodoContext from "../TodoContext";
import style from '../style/Game.module.css';

export default function Result(nameUser) {

  const { 
    results, 
    answersAll, 
    setEnd, 
    setLoading, 
    setIndexAnswers } = useContext(TodoContext);

  let correct = 0;

  results.forEach(({answerCorrect, answer}) => {
    if ( answerCorrect === answer ) correct += 1;  
  });

  return(
    <div>
      <div className={style.result}>
      <Link to={`/home`}>
        <Button
          onClick={() =>{
            setEnd(false);
            setLoading(true);
            setIndexAnswers(0);
          }} 
          variant="success"
        >New Game</Button>
      </Link>
        <h2>{`${correct} out of ${answersAll.length} correct answer`}</h2>
        <span></span>
      </div>
      {results.map(({ questiom, answer, answerCorrect }) =>{ 
        const color = (answerCorrect === answer)? "success": "danger";
        return(
          <Card key={answer} className={style.resultCard}>
            <Card.Header>
              <h4>{questiom}</h4> 
            </Card.Header>
            <Card.Body>
              <ListGroup.Item variant="dark">{answer}</ListGroup.Item>
              <ListGroup.Item variant={color}>{answerCorrect}</ListGroup.Item> 
            </Card.Body>
          </Card>
      )})}
    </div>
  )
}