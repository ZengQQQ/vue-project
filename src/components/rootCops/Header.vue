<template>
  <header id="welcome-section">
    <div class="forest"></div>
    <div class="silhouette"></div>
    <div class="moon"></div>
    <div class="container">
      <h1>
        <span class="line">Compition Systems<span class="color">&</span>Research</span>
        <!-- <span class="line">Research</span> -->
        <br/>
        <span class="line">Team UP<span class="color">&</span>Fight!</span>
      </h1>
      <div class="buttons">
        <!-- <a href="#projects">my portfolio</a> -->
        <router-link to="/login">login</router-link>
        <router-link to="/register" class="cta">register</router-link>
        <!-- <a href="#contact" class="cta">get in touch</a> -->
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router';
const router = useRoute();

</script>

<style scoped>
#welcome-section {
  background: #202736;
  background: linear-gradient(to bottom, #181d23 0%, #202736 80%);
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  z-index: 1;
}

#welcome-section::before {
  content: '';
  position: fixed;
  /* background: url(https://raw.githubusercontent.com/yagoestevez/fcc-portfolio/master/src/Images/Stars.svg?sanitize=true); */
  background: url(@/assets/imgs/Stars.svg);
  background-attachment: fixed;
  width: 100%;
  min-height: 100vh;
  z-index: -1;
  opacity: 0;
  animation: stars-move-in 1000ms 300ms forwards;
}

@keyframes stars-move-in {
  from {
    background-position-y: -100px;
  }
  to {
    opacity: 1;
    background-position-y: 0;
  }
}

.forest {
  position: absolute;
  bottom: -300px;
  left: 0;
  /* background: url(https://raw.githubusercontent.com/yagoestevez/fcc-portfolio/master/src/Images/Trees.svg?sanitize=true) bottom left repeat-x; */
  background: url(@/assets/imgs/Trees.svg;) bottom left repeat-x;
  background-size: cover;
  width: 100%;
  height: 80%;
  opacity: 0;
  animation: forest-move-in 1000ms 500ms forwards;
  border-bottom: 300px solid #181d23;
}

@keyframes forest-move-in {
  from {
    background-position-y: 150%;
  }
  to {
    opacity: 1;
    background-position-y: 100%;
  }
}

.silhouette {
  position: absolute;
  bottom: 0;
  left: 0;
  /* background: url(https://raw.githubusercontent.com/yagoestevez/fcc-portfolio/master/src/Images/Silhouette.svg?sanitize=true) bottom left no-repeat; */
  background: url(@/assets/imgs/Silhouette.svg) bottom left no-repeat;
  width: 50%;
  height: 50%;
  opacity: 0;
  animation: silhouette-move-in 1000ms 800ms forwards;
}

@keyframes silhouette-move-in {
  from {
    background-position-x: 0;
  }
  to {
    opacity: 1;
    background-position-x: 50%;
  }
}

.moon {
  position: absolute;
  top: 0;
  right: 0;
  position: fixed;
  /* background: url(https://raw.githubusercontent.com/yagoestevez/fcc-portfolio/master/src/Images/Moon.svg?sanitize=true) right 150% no-repeat; */
  background: url(@/assets/imgs/Moon.svg) right 150% no-repeat;
  background-size: 40% 40%;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0;
  animation: moon-move-in 1.2s 1s forwards;
}

@keyframes moon-move-in {
  from {
    opacity: 0;
    background-position: right 150%;
  }
  to {
    opacity: 1;
    background-position: top right;
  }
}

/* Copy and CTA */
#welcome-section .container {
  width: fit-content;
  position: absolute;
  right: 0;
  top: 50%;
  right: 25%;
  opacity: 0;
  transform: translate(0, -50%);
  animation: text-fade-in 1000ms 800ms forwards;
}

@keyframes text-fade-in {
  from {
    right: 0;
  }
  to {
    opacity: 1;
    right: 25%;
  }
}

#welcome-section .container h1 {
  font-size: 4rem;
  font-weight: normal;
  font-style: italic;
  color: #fafafa;
  line-height: 3rem;
}

#welcome-section .container h1 .line:first-child {
  margin-left: 1rem;
}

#welcome-section .container h1 .line:last-child {
  margin-left: 2rem;
}

#welcome-section .container .buttons {
  display: flex;
  margin-top: 1rem;
}

#welcome-section .container .buttons a,
#welcome-section .container .buttons a:visited {
  width: 100%;
  padding: 1rem;
  border: 1px solid #fafafa;
  color: #fafafa;
  text-align: center;
  text-transform: uppercase;
  font-size: 1rem;
}

#welcome-section .container .buttons a:hover,
#welcome-section .container .buttons a:active {
  border: 1px solid #f300b4;
  transform: translateY(-2px);
  box-shadow: 0 10px 100px -20px #f300b4;
}

#welcome-section .container .buttons a.cta,
#welcome-section .container .buttons a.cta:visited {
  background: #f300b4;
  border: 1px solid transparent;
  color: #fafafa;
  font-weight: bold;
}

#welcome-section .container .buttons a.cta:hover,
#welcome-section .container .buttons a.cta:active {
  background: transparent;
  border: 1px solid #f300b4;
}

#welcome-section .container .buttons a:first-child {
  margin-right: 1rem;
}

.line {
  display: block;
}

.color {
  color: #f300b4;
  font-style: italic;
}

@media only screen and (max-width: 649px) {
  #welcome-section .container {
    right: 50%;
    top: 10%;
    width: 80%;
    transform: translate(50%, 0);
    animation: text-fade-in 1000ms 800ms forwards;
  }

  @keyframes text-fade-in {
    from {
      right: 0;
    }
    to {
      opacity: 1;
      right: 50%;
    }
  }

  .silhouette {
    width: 100%;
  }
}
</style>
