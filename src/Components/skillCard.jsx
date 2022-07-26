import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from "react-bootstrap";
import bash from '../Icons_Img/bash.jpeg';
import devops from '../Icons_Img/devops.png';
import docker from '../Icons_Img/docker.png';
import html from '../Icons_Img/html.png';
import js from '../Icons_Img/js.png';
import kubernetes from '../Icons_Img/kubernetes.jpeg';
import laravel from '../Icons_Img/laravel.png';
import linux from '../Icons_Img/linux.jpeg';
import mysql from '../Icons_Img/mysql.jpeg';
import php from '../Icons_Img/php.jpeg';
import wordpress from '../Icons_Img/wordpress.png';
import TodoContext from '../TodoContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style/Home.module.css';

function SkillCard() {
  const tags = [
    {name: "JavaScript", img: js}, 
    {name: "PHP", img: php},
    {name: "MySQL", img: mysql},
    {name: "Linux", img: linux},
    {name: "Docker", img: docker},
    {name: "HTML", img: html},
    {name: "BASH", img: bash},
    {name: "WordPress", img: wordpress},
    {name: "Laravel", img: laravel},
    {name: "kubernetes", img: kubernetes},
    {name: "DevOps", img: devops}
  ]

  const { setCategory, nameUser, setNameUser } = useContext(TodoContext);

  // setNameUser(useParams().nameUser)
  return(
    <main>
      <div className={style.list}>
        {tags.map(({ name, img }) => (
          <div 
            className={style.card}
            onClick={() => setCategory(name)} 
          >
            <Link to={`/${name}/game`}>
              <ListGroup.Item action variant="info">
                <img className={style.image} src={img} />
              </ListGroup.Item>
            </Link> 
          </div>
        ))} 
      </div>
    </main>
  );
}

export default SkillCard;