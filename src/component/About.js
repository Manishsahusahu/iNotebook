import React, {useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a= useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>About The name is {a.state.name} and the class is {a.state.class}</div>
  )
}

export default About;