<script setup lang="ts">
import ProjectCard from "../components/ProjectCard.vue";
import vueLogo from '@/assets/logos/vue.svg'
import tsLogo from '@/assets/logos/typescript.svg'
import viteLogo from '@/assets/logos/vite.svg'
import reactLogo from '@/assets/logos/react.svg'
import goLogo from '@/assets/logos/go.svg'
import postgresLogo from '@/assets/logos/postgresql.svg'
import pythonLogo from '@/assets/logos/python.svg'
import jsLogo from '@/assets/logos/javascript.svg'
import cplusLogo from '@/assets/logos/cplusplus.svg'
import javaLogo from '@/assets/logos/java.svg'
import dockerLogo from '@/assets/logos/docker.svg'

import calcProject from '@/assets/img/calc-project.png'
import pokeproject from '@/assets/img/poke-project.png'
import formProject from '@/assets/img/form-project.png'
import ormProject from '@/assets/img/orm-project.svg'
import conjProject from '@/assets/img/conj-project.svg'
import pacmanProject from '@/assets/img/pacman-project.svg'
import javaProject from '@/assets/img/java-project.svg'
import porfolioProject from '@/assets/img/portfolio-project.png'

const projects = [
  {
    title: 'Portfolio Web',
    description: 'Mi portafolio personal donde expongo mis habilidades.',
    image: porfolioProject,
    techs: [
      { name: 'Vue', icon: vueLogo },
      { name: 'TypeScript', icon: tsLogo },
      { name: 'Vite', icon: viteLogo },
    ],
    link: 'https://diego-o-flores-portfolio.netlify.app',
    github: 'https://github.com/DiegoOF07/portafolio.git'
  },
  {
    title: 'Práctica con ORM',
    description: 'Práctica de uso para un ORM, en este caso gorm para el manejo de una base de datos relacional con PostgreSQL. Se incluye el uso de CRUDS y tipos de datos personalizados.',
    image: ormProject,
    techs: [
      { name: 'Go', icon: goLogo },
      { name: 'PostgreSQL', icon: postgresLogo },
      { name: 'Docker', icon: dockerLogo },
    ],
    github: 'https://github.com/DiegoOF07/lab3_db.git'
  },
  {
    title: 'Calculadora simple',
    description: 'Calculadora simple que puede realizar las operaciones aritméticas suma, resta, multiplicación y división.',
    image: calcProject,
    techs: [
      { name: 'React', icon: reactLogo },
      { name: 'Javascript', icon: jsLogo },
      { name: 'Vite', icon: viteLogo}
    ],
    link: 'https://basic-calc-project.netlify.app',
    github: 'https://github.com/DiegoOF07/proyecto_calculadora.git'
  },
  {
    title: 'Operaciones entre conjuntos',
    description: 'Programa hecho en Python que se encarga de realizar operaciones entre conjuntos. También tiene la capacidad de generar sus propios cojuntos a elección del usuario.',
    image: conjProject,
    techs: [
      { name: 'Python', icon: pythonLogo },
    ],
    github: 'https://github.com/DiegoOF07/proyecto01-mate-discreta.git'
  },
  {
    title: 'Pacman en consola',
    description: 'Imitación del juego Pacman en consola utilizando paralelismo para el movimiento independiente de los enemigos y el jugador.',
    image: pacmanProject,
    techs: [
      { name: 'C++', icon: cplusLogo },
    ],
    github: 'https://github.com/DiegoOF07/proyecto3_microprocesadores.git'
  },
  {
    title: 'Control de Horario',
    description: 'Programa hecho en Java cuya finalidad es llevar el control de los horarios de un salon en específico.',
    image: javaProject,
    techs: [
      { name: 'Java', icon: javaLogo },
    ],
    github: 'https://github.com/DiegoOF07/asignacion-horario-lab2.git'
  },
  {
    title: 'Pokedex',
    description: 'Aplicación que da la información de distintos pokemon, permitiendo buscarlos desde por su nombre.',
    image: pokeproject,
    techs: [
      { name: 'React', icon: reactLogo },
      { name: 'Typescript', icon: tsLogo },
      { name: 'Vite', icon: viteLogo}
    ],
    link: 'https://pokemon-app-search.netlify.app',
    github: 'https://github.com/DiegoOF07/proyecto3_microprocesadores.git'
  },
  {
    title: 'Cuestionario + paginación',
    description: 'Cuestionario custom que implementa paginación para una amplia cantidad de preguntas. Al final muestra un resumen de las respuestas obtenidas.',
    image: formProject,
    techs: [
      { name: 'React', icon: reactLogo },
      { name: 'Javascript', icon: jsLogo },
      { name: 'Vite', icon: viteLogo}
    ],
    link: 'https://diego-cuestionario-app.netlify.app',
    github: 'https://github.com/DiegoOF07/cuestionario.git'
  },
];
</script>

<template>
  <section class="projects-wrapper">
    <h1 class="title">Proyectos</h1>
    <div class="cards">
      <ProjectCard
        v-for="(p, i) in projects"
        :key="p.title"
        v-bind="p"
        :i="i"
      />
    </div>
  </section>
</template>

<style scoped>
.projects-wrapper {
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 16rem;
}
.title {
  font-size: 2.5rem;
  margin-bottom: 3rem;
}
.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
}

@media (max-width: 768px) {
  .title{
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .projects-wrapper{
    padding-bottom: 2rem;
  }
}


</style>
