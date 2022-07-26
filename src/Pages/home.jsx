import React from 'react';
// import { useParams } from 'react-router-dom';
import Header from '../Components/header';
import SkillCard from '../Components/skillCard';

function Home() { 
  return(
    <div>
      <Header />     
      <SkillCard nameUser='hudson' />
    </div>
  );
}

export default Home;