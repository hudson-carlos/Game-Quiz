import { useEffect, useContext } from "react";
import { Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import TodoContext from '../TodoContext';
import Result from "../Components/result";
import Navigator from "../Components/navigator";
import Buttons from "../Components/buttons";
import Answer from "../Components/answers";
import style from '../style/Game.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Game() {
  const { 
    category,  
    setAnswersAll, 
    data,
    setData,
    setQuestion,
    question,
    indexAnswers,
    setLoading,
    end,
    loading,
  } = useContext(TodoContext);

  
  function getAnswers(arr) {
    const newAnswers = [];
    
    arr.forEach(({answers}, index) => {
      const objAnswers = []      
      Object.keys(answers).forEach(keyAnswer => {
        const answer = answers[keyAnswer]; 
        if(answer) { 
          objAnswers.push({
            key: keyAnswer,  
            answer: answers[keyAnswer], 
            selected: "answer",
            index,
          }); 
        }  
      });
      newAnswers.push(objAnswers)       
    }) 
    setAnswersAll(newAnswers);
  }
  
  
  useEffect(() => {
    const apikey = process.env.REACT_APP_KEY_API;
    const url = `https://quizapi.io/api/v1/questions`;

    axios.get(`${url}?apiKey=${apikey}&tags=${category}&limit=10`, {
    }).then(({ data }) => {
      setData(data);
      setQuestion(data[0].question);
      getAnswers(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className={style.loading}>
      <Spinner animation="border" variant="dark" /> 
      <h2>Loading...</h2>
    </div>
  );
  
  if(end) return <Result nameUser='hudson' />;
  
  return(
    <main className={style.game}>
      <div className={style.nav}>
        <Navigator />
      </div>
      <div className={style.question}>
        <Card>
          <Card.Header>
            <h2>{question}</h2>
          </Card.Header>
          <Card.Subtitle className="mb-2 text-muted text">
            <h1>{category}</h1> 
          </Card.Subtitle>
          <Card.Body>
            <Answer />
          </Card.Body>
            <div className={style.text}>
              <span>{`${indexAnswers +1}/${data.length}`}</span>
            </div> 
          <Buttons />
        </Card>
      </div>
    </main>
  ); 
}
