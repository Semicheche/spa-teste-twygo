// CourseListPage.tsx
import { Box, Container, Heading, List, ListItem, Menu, MenuButton } from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CourseSizePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courses = location.state;
  const totalSize = courses.lista.map((l) => l.videoSize.match(/[\d,]+\.\d+|\d,]+\.\d+|\d+/)).reduce((a, b) => parseFloat(a) + parseFloat(b));
  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <Container p={4}>
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
          onClick={handleButtonClick}
      >Voltar</MenuButton>
      </Menu>
      <Box p={6} m={2} borderWidth={1} borderRadius="lg" boxShadow='lg'><Heading as="h6" size="md" >Qtd Cursos: {courses.lista.length}</Heading></Box>
      <Box p={6} m={2} borderWidth={1} borderRadius="lg" boxShadow='lg'>
      <Heading as="h6" size="md" >Tamanho Total dos Cursos (GB)</Heading>
      <CircularProgress value={totalSize} size='250px' >
        <CircularProgressLabel >{totalSize} GB</CircularProgressLabel>
      </CircularProgress>
      </Box>
     </Container>
  );
};

export default CourseSizePage;
