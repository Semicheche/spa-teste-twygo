// src/components/CourseList.tsx
import {
  Box, 
  Heading, 
  Text,
  Button } from '@chakra-ui/react';
import { Course } from '../types/Course';

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onEdit, onDelete }) => {
  return (
    <>
      { courses.map((course) => (
        <Box key={course.id} p={4} borderWidth={1} borderRadius="lg" boxShadow='lg'>
          <Heading as="h3" size="md">{course.title}</Heading>
          <Text>{course.description}</Text>
          <Text>Vídeo: {course.videoSize}</Text>
          <Button onClick={() => onEdit(course)} colorScheme="blue" mr={2}>Editar</Button>
          <Button onClick={() => onDelete(course.id)} colorScheme="red">Excluir</Button>
        </Box>
      )) }
    </>
  );
};

export default CourseList;