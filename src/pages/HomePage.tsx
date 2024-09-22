import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseList from '../components/CourseList.tsx';
import CourseForm from '../components/CourseForm.tsx';
import { Course } from '../types/Course';
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

interface CourseListProps {
  courses: Course[];
}

const HomePage: React.FC<CourseListProps> = ({ fetchedCourses }) => {
  const navigate = useNavigate();
  const toast = useToast();


  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  type Status = false | true;
  const [status, setStatus] = useState<Status>(false); 

  useEffect(() => {
    setStatus(false);
    const localCourses = JSON.parse(localStorage.getItem('courses'));
 
    if (localCourses === null || localCourses === undefined) {
      localStorage.setItem("courses", JSON.stringify(fetchedCourses));
    } 
    const currentDate = new Date();
    const filteredCourses: Course[] = localCourses !== null ? localCourses.filter(course => new Date(course.endDate) > currentDate) : fetchedCourses.filter(course => new Date(course.endDate) > currentDate);
    setCourses(filteredCourses);
  }, []);

  const handleEditCourse = (updatedCourse: Course) => {
    onOpen()
    setStatus(true);
  
    setCourse(updatedCourse);
    const updatedCourses = courses.map(course => 
      course.id === updatedCourse.id ? updatedCourse : course
    );
    return updatedCourses;
  };

  const addCourse = (newCourse: Omit<Course, 'id'>) => {
   
    if (new Date(newCourse.endDate).getTime() >= new Date().getTime()) {
      if (!status) {
        const id = courses.map((c) => c.id).reduce((a, b) => Math.max(a, b)) + 1;
        setCourses([...courses, { ...newCourse, id }]);
        localStorage.setItem("courses", JSON.stringify([ ...courses, { ...newCourse, id }]));
      } else {
        const updatedCourses = courses.map(course => 
          course.id === newCourse.id ? newCourse : course
        );
        setCourses(updatedCourses);
        localStorage.setItem("courses", JSON.stringify(courses));
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
    localStorage.setItem("courses", JSON.stringify(courses.filter(course => course.id !== id)));
  };
  const handleButtonClick = () => {
    navigate('/course-size', { state: { lista: courses } });
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
            <MenuButton
            px={4}
            py={2}
            transition='all 0.2s'
            borderRadius='md'
            borderWidth='1px'
            _hover={{ bg: 'gray.400' }}
            _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }}
            onClick={handleButtonClick}
        >Relatório Cursos</MenuButton>
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

export default HomePage;
