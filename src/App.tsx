// src/App.tsx
import React, { useState, useEffect } from 'react';
import CourseList from './components/CourseList.tsx';
import CourseForm from './components/CourseForm.tsx';
import { Course } from './types/Course';
import { Box, Heading, Container, useToast, SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
 } from '@chakra-ui/react';
 import {
  Menu,
  MenuButton,
} from '@chakra-ui/react'

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  type Status = false | true;
  const [status, setStatus] = useState<Status>(false); 
  
  useEffect(() => {
    setStatus(false);
    // Simulação de dados de cursos com data de término
    const fetchedCourses: Course[] = [
      { id: 1, title: 'Curso React', description: 'Curso avançado de React', endDate: '2024-12-31', videoSize: '2 GB' },
      { id: 2, title: 'Curso NodeJS', description: 'Curso básico de NodeJS', endDate: '2023-10-10', videoSize: '1.5 GB' },
      { id: 2, title: 'Curso VueJS', description: 'Curso básico de Vues', endDate: '2024-10-10', videoSize: '1.5 GB' },
    ];

    // Filtrar cursos com data de término futura
    const currentDate = new Date();
    const filteredCourses = fetchedCourses.filter(course => new Date(course.endDate) > currentDate);
    setCourses(filteredCourses);
  }, []);

  const handleEditCourse = (updatedCourse: Course) => {
    onOpen()
    setStatus(true);
    console.log(updatedCourse)
    setCourse(updatedCourse);
    const updatedCourses = courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    );
    return updatedCourses;
  };
  const toast = useToast();

  const addCourse = (newCourse: Omit<Course, 'id'>) => {
    if (new Date(newCourse.endDate).getTime() >= new Date().getTime()) {
      if (!status) {
        const id = courses.length + 1;
        setCourses([...courses, { ...newCourse, id }]);
      } else {
        const updatedCourses = courses.map(course => 
          course.id === newCourse.id ? newCourse : course
        );
        console.log(updatedCourses);
        setCourses(updatedCourses);
      
      }
      onClose()
    } else {
      toast({
        title: 'Data Término Incoreta',
        description: "Data Término Precisa Ser maior que Hoje",
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })
      onClose()
    }

  };
  const handleOpenModal = () => {
    setStatus(false);  // Executa a outra função
    onOpen();  // Fecha o modal
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };
  return (
    <Container maxW='100%' p={4}>
      <Menu  variant='outline' >
        <MenuButton
          px={4}
          py={2}
          transition='all 0.2s'
          borderRadius='md'
          borderWidth='1px'
          _hover={{ bg: 'gray.400' }}
          _expanded={{ bg: 'blue.400' }}
          _focus={{ boxShadow: 'outline' }}
          onClick={handleOpenModal}
        >Adicionar Curso</MenuButton>
      </Menu>
      <Box p={6} m={2}>
        <Heading as="h6" size="lg" >Cursos Atuais</Heading>
      </Box>
      <SimpleGrid columns={[1, 2, 3]} spacing={5}>
        <CourseList  courses={courses} onEdit={handleEditCourse} onDelete={handleDeleteCourse} />
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{status ? 'Editar' : 'Adicionar'} Curso</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CourseForm onSubmit={addCourse} course={course} status={status}/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default App;
