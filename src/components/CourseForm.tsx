// src/components/CourseForm.tsx
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Course } from '../types/Course';

interface CourseFormProps {
  onSubmit: (course) => void;
  course: Course;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit, course, status }) => {
  const [id, setId] = useState(status ? course.id : 0);
  const [title, setTitle] = useState(status ? course.title : '');
  const [description, setDescription] = useState(status ? course.description : '');
  const [endDate, setEndDate] = useState(status ? course.endDate : '');
  const [videoSize, setVideoSize] = useState(status ? course.videoSize : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id, title, description, endDate, videoSize });
    setId(0);
    setTitle('');
    setDescription('');
    setEndDate('');
    setVideoSize('');
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="lg" w="100%" >
      <FormControl id="title" mb={3}>
        <FormLabel>Título</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </FormControl>
      <FormControl id="description" mb={3}>
        <FormLabel>Descrição</FormLabel>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>
      <FormControl id="endDate" mb={3}>
        <FormLabel>Data de Término</FormLabel>
        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </FormControl>
      <FormControl id="videoSize" mb={3}>
        <FormLabel>Tamanho do Vídeo (em GB)</FormLabel>
        <Input value={videoSize} onChange={(e) => setVideoSize(e.target.value)} />
      </FormControl>
      <Button type="submit" colorScheme="teal">Gravar</Button>
    </Box>
  );
};

export default CourseForm;
