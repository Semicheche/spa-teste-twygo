// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Course } from './types/Course.ts';
import HomePage
 from './pages/HomePage.tsx';
import CourseSizePage from './pages/CourseSizePage.tsx';
const App: React.FC = () => {
  const fetchedCourses: Course[] = [
    { id: 1, title: 'Curso React', description: 'Curso avançado de React', endDate: '2024-12-31', videoSize: '2 GB' },
    { id: 2, title: 'Curso NodeJS', description: 'Curso básico de NodeJS', endDate: '2023-10-10', videoSize: '1.5 GB' },
    { id: 3, title: 'Curso VueJS', description: 'Curso básico de Vues', endDate: '2024-10-10', videoSize: '1.5 GB' },
  ];
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage fetchedCourses={fetchedCourses} />} />
        <Route path="/course-size" element={<CourseSizePage />} />
      </Routes>
    </Router>    
  );
};

export default App;
