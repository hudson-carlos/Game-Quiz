import { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import TodoContext from "../TodoContext";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigator() {
  const { data, setQuestion, setIndexAnswers } = useContext(TodoContext);

  return (
    <ListGroup style={{ width: '110px' }}>
        {data.map((_, index) => (
          <ListGroup.Item
            action 
            variant="dark" 
            key={index}
            onClick={() => {
              setQuestion(data[index].question);
              setIndexAnswers(index);
            }}
          >{`Question${index+1}`}
        </ListGroup.Item>
        ))}    
    </ListGroup>       
  );
}



