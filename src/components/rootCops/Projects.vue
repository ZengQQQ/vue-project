<template>
    <section id="projects">
      <div class="projects-container">
        <div class="heading">
          <h3 class="title">My Works</h3>
          <p class="separator" />
          <p class="subtitle">
            Here's a list of <u>most</u> of the projects I've been working on lately. All of these
            were built during my coding camp adventure on{' '}
            <a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer">
              freeCodeCamp
            </a>
            , where I've been coding for almost 7 months non-stop until I completed all the projects
            required to get my Full-Stack Developer certification.
          </p>
        </div>
        <div class="projects-wrapper">
          <Project
            v-for="(project, index) in projectData"
            :key="index"
            :title="project.title"
            :img="project.img"
            :tech="project.tech"
            :link="project.link"
            :repo="project.repo"
          >
            <small>{{ project.description }}</small>
            <p>{{ project.details }}</p>
          </Project>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import Project from '@/components/rootCops/Project.vue'; // Assuming the Project component is in the same directory
  
  export default {
    components: {
      Project
    },
    data() {
      return {
        projectData: [
          {
            title: "Anonymous Message Board.",
            img: 'https://raw.githubusercontent.com/yagoestevez/fcc-portfolio/master/src/Components/Projects/Images/AnonMsgBoard.jpg',
            tech: "js css react node",
            link: "https://yagoestevez-anon-msg-board.glitch.me/",
            repo: "https://github.com/yagoestevez/anonymous-message-board",
            description: "Built using Node, Express, MongoDB, CSS + Bulma, React.js and React Router.",
            details: "This is a full-stack website that I made which lets the users read and post anonymous messages and replies."
          },
          // Add other projects here...
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* Paste the CSS styles from the original Projects component here */
  

/*****************
 *****************
  PROJECTS STYLES
 *****************
 *****************/

#projects {
  min-height: 100vh;
  font-size: 1.4rem;
  position: relative;
  background: #f0f0f0;
  background: linear-gradient(215deg, #f0f0f0 0%,#fafafa 100%);
  margin-top: -10rem;
  z-index: 1;
}

#projects a,
#projects a:visited {
  color: #f300b4;
}

#projects a:hover,
#projects a:active {
  color: #252934;
}

/* Container */
#projects .projects-container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 12rem 5rem 8rem;
}

/* Heading */
#projects .heading .title {
  text-align: center;
  font-size: 2.4rem;
  line-height: 2.4rem;
}

#projects .heading .separator {
  background: #f300b4;
  width: 150px;
  height: 2px;
  margin: 1rem auto;
}

#projects .heading .subtitle {
  font-size: 1.4rem;
  text-align: center;
  width: 70%;
  margin: 0 auto;
  text-align: justify;
}

/* Single Project */
#projects .project {
  margin: 1rem auto;
  width: 70%;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 2rem;
}

/* Project Image */
#projects .project .project-link {
  display: block;
  margin: auto 0;
  color: #252934;
  overflow: hidden;
  text-align: center;
  border-radius: 50%;
  border: 1px solid #fafafa;
  box-shadow: 0 20px 10px -10px #25293450;
  transition: 300ms;
}

#projects .project .project-link:hover {
  box-shadow: 0 50px 15px -30px #25293450;
}

#projects .project .project-link:hover > img {
  filter: saturate(1);
  transform: scale(1.05);
}

#projects .project .project-image {
  width: 100%;
  transform: scale(1.2);
  filter: saturate(0);
  transition: all 300ms;
}

/* Project Details */
#projects .project .project-details {
  margin: auto 0;
}

#projects .project-details .project-tile {
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 0;
  color: #f300b4;
}

/* Icons */
#projects .project-details .icons {
  margin: 0;
  color: #252934;
}

#projects .project-details .icons i {
  margin-right: .4rem;
  font-weight: normal;
  font-size: 1.4rem;
}

/* Text */
#projects .project-details small {
  font-style: italic;
}

#projects .project-details p {
  margin: 1rem 0;
}

/* Buttons */
#projects .project-details .buttons {
  display: flex;
  justify-content: space-between;
}

#projects .project-details .buttons a {
  width: 49%;
  padding: .5rem;
  border: none;
  border-bottom: 1px solid #f300b4;
  color: #252934;
  background: #fafafa;
  font-size: 1.2rem;
  text-align: center;
}

#projects .project-details .buttons a:hover {
  background: #f300b4;
  color: #fafafa;
}
#projects .project-details .buttons i {
  font-size: .8rem;
  vertical-align: middle;
  margin-left: .5rem;;
}


@media only screen and (max-width: 1149px) {
  #projects .project {
    grid-template-columns: 1fr 2fr;
  }
}

@media only screen and (max-width: 949px) {
  #projects .project {
    grid-template-columns: 1fr;
  }
}

@media only screen and (max-width: 649px) {
  #projects {
    background: #f0f0f0;
  }
  #projects .projects-container {
    padding: 12rem 0 8rem;
  }
  #projects .project {
    padding: 2rem 0;
  }
}



  </style>
  