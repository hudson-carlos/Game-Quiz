import React from 'react';
import { useParams } from "react-router-dom";
import style from '../style/Header.module.css';


function Header() {
  return(
    <header className={style.header}>
      <span>{useParams().nameUser}</span>
      <h1>Choose your category!</h1>
      <h5>Test your knowledge!</h5>
    </header>

  );
}

export default Header;
