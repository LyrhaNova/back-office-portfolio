// import projet1Booki from '../assets/projects/projet1_booki.webp';
// import projet2Sb1 from '../assets/projects/projet2_sb1.webp';
// import projet3Nc1 from '../assets/projects/projet3_nc1.webp';
// import projet4Kasa1 from '../assets/projects/projet4_kasa1.webp';
// import projet5Mvg1 from '../assets/projects/projet5_mvg1.webp';


export interface IProject {
  id: string,
  title: string,
  description: string,
  largeDescription: string,
  techs: string,
  imageUrl: string,
  github: string
}

// export const projects: IProject[] = [
//   {
//     id: 1,
//     "title": "BOOKI",
//     "description": "Création d'une page d'accueil d'une agence de voyage.",
//     "largeDescription": "Dans le cadre de ma formation OpenClassRooms en Développement web, j'ai réalisé le projet Booki, qui consiste à créer une page d'accueil pour une agence de voyage. Ce projet m'a permis de mettre en pratique mes compétences en HTML5 et CSS3, en partant d'une maquette Figma. J'ai appris à structurer la page de manière efficace, tout en appliquant des techniques de mise en page modernes pour offrir une expérience utilisateur agréable.",
//     "techs": "HTML5 & CSS3",
//     "imageUrl": projet1Booki,
//     "github": "https://github.com/LyrhaNova/OCR-Project_2"
//   },
//   {
//     id: 2,
//     "title": "SOPHIE BLUEL",
//     "description": "Création d'une page web dynamique.",
//     "largeDescription": "Dans le cadre de ma formation OpenClassRooms en Développement web, j'ai eu l'opportunité de travailler sur le projet Sophie Bluel, où j'ai rendu dynamique le portfolio d'une architecte. Grâce à mes connaissances en Javascript, j'ai implémenté des fonctionnalités permettant à l'utilisateur de se connecter, d'ajouter et de supprimer des projets. Ce projet a été un excellent moyen de renforcer mes compétences en interaction utilisateur et en gestion de données.",
//     "techs": "Javascript",
//     "imageUrl": projet2Sb1,
//     "github": "https://github.com/LyrhaNova/OCR-Project_3"
//   },
//   {
//     id: 3,
//     "title": "NINA CARDUCCI",
//     "description": "Optimisation et debogage d'un site de photographe.",
//     "largeDescription": "Dans le cadre de ma formation OpenClassRooms en Développement web, le projet Nina Carducci m'a permis de travailler sur l'optimisation et le débogage d'un site de photographe. J'ai particulièrement mis l'accent sur le SEO et l'accessibilité, en appliquant des techniques de référencement efficaces pour améliorer la visibilité du site. Ce projet a été essentiel pour renforcer mes compétences en optimisation de site web.",
//     "techs": "HTML5, CSS3, Javascript, Optimisation, Debug, SEO",
//     "imageUrl": projet3Nc1,
//     "github": "https://github.com/LyrhaNova/OCR-Project_4"
//   },
//   {
//     id: 4,
//     "title": "KASA",
//     "description": "Création d'une application web de location immobilière.",
//     "largeDescription": "Dans le cadre de ma formation OpenClassRooms en Développement web, le projet Kasa m'a donné l'occasion d'implémenter le front-end d'une application de location immobilière en utilisant React et React Router. J'ai ainsi pu créer une expérience utilisateur moderne et réactive, tout en découvrant l'utilisation de Sass pour le style et les animations CSS pour rendre l'application plus attrayante.",
//     "techs": "React, Vite, React Router, Javascript, SCSS",
//     "imageUrl": projet4Kasa1,
//     "github": "https://github.com/LyrhaNova/OCR-Project_5"
//   },
//   { 
//     id: 5,
//     "title": "MON VIEUX GRIMOIRE",
//     "description": "Développement du back-end d'un site de notation de livres.",
//     "largeDescription": "Dans le cadre de ma formation OpenClassRooms en Développement web, le projet Mon Vieux Grimoire m'a permis de me plonger dans le développement back-end en créant un serveur avec Express et en le connectant à une base de données MongoDB. J'ai acquis des compétences sur la gestion des requêtes HTTP et la mise en œuvre des opérations CRUD, ce qui m'a donné une compréhension solide des architectures serveur.",
//     "techs": "Javascript, Express, MongoDB, Mongoose, CRUD",
//     "imageUrl": projet5Mvg1,
//     "github": "https://github.com/LyrhaNova/OCR-Project_6"
//   }
// ]