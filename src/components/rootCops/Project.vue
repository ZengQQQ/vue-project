<template>
    <div class="project">
      <a class="project-link" :href="link" target="_blank" rel="noopener noreferrer">
        <img class="project-image" :src="img" :alt="'Screenshot of ' + title" />
      </a>
      <div class="project-details">
        <div class="project-tile">
          <p class="icons">
            <i :class="techIcons[t]" v-for="t in techList" :key="t" />
          </p>
          {{ title }} 
        </div>
        <slot></slot>
        <div class="buttons">
          <a :href="repo" target="_blank" rel="noopener noreferrer">
            View source <i class="fas fa-external-link-alt" />
          </a>
          <a :href="link" target="_blank" rel="noopener noreferrer">
            Try it Live <i class="fas fa-external-link-alt" />
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      img: String,
      tech: String,
      link: {
        type: String,
        default: 'http://'
      },
      repo: {
        type: String,
        default: 'http://'
      }
    },
    setup(props) {
      const techIcons = {
        sass: 'fab fa-sass',
        css: 'fab fa-css3-alt',
        js: 'fab fa-js-square',
        react: 'fab fa-react',
        vue: 'fab fa-vuejs',
        d3: 'far fa-chart-bar',
        node: 'fab fa-node'
      };
  
      // 处理 tech 属性，将其转换为字符串数组
      const techList = props.tech.split(' ');
  
      return { techIcons, techList };
    }
  };
  </script>
  
  <style scoped>
  /* CSS styles from the original project component */
  /* Paste the CSS styles here */
  </style>
  