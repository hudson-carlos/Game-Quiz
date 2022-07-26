import { useState } from "react";
import TodoContext from "../TodoContext";

function TodoProvider({ children }) {
  const [category, setCategory] = useState("JavaScript");
  const [results, setResults] = useState([]);
  const [answersAll, setAnswersAll] = useState([]);
  const [data, setData] = useState([]);
  const [indexAnswers, setIndexAnswers] = useState(0);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("answer");
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [messageError, setMessageErro] = useState('');
  const [nameUser, setNameUser] = useState('');

  const value = {
    category,
    setCategory,
    results,
    setResults,
    answersAll,
    setAnswersAll,
    data,
    setData,
    indexAnswers, 
    setIndexAnswers,
    question, 
    setQuestion,
    loading,
    setLoading,
    end,
    setEnd,
    selectedAnswer,
    setSelectedAnswer,
    users,
    setUsers,
    showAlert, 
    setShowAlert,
    messageError, 
    setMessageErro,
    nameUser, 
    setNameUser,
  };

  return (
    <TodoContext.Provider value={ value }>
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
