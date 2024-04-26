<template>
  <section id="about">
    <div class="wrapper">
      <article>
        <div class="title">
          <h3>Who's this guy?</h3>
          <p class="separator" />
        </div>
        <div class="desc full">
          <h4 class="subtitle">My name is Yago.</h4>
          <p>
            I am a web developer and UX designer based in the beautiful west coast of Spain, Galicia.
          </p>
          <p>
            I really enjoy solving problems as well as making things pretty and easy to use. I
            can't stop learning new things; the more, the better. I also love photography, a hobby
            I'm taking along since the good old film cameras. Oh, and rice with milk; I have a
            passion for rice with milk!
          </p>
        </div>
        <div class="title">
          <h3>What does he do?</h3>
          <p class="separator" />
        </div>
        <div class="desc">
          <h4 class="subtitle">I'm a programmer.</h4>
          <p>
            For the front-end I usually work with Javascript, either standalone or including
            popular frameworks like ReactJS and VueJS. I also make the web pretty by using Sass,
            CSS and, whenever needed, any of their friends: Bootstrap, Bulma, etc.
          </p>
          <p>
            For the back-end I also work with Javascript (NodeJS, Express, MongoDB, etc). But, of
            course, whenever the project requires PHP, I do PHP as well (Wordpress, Laravel, etc).
          </p>
        </div>
        <div class="desc">
          <h4 class="subtitle">Also a designer.</h4>
          <p>
            I feel comfortable working with many Adobe products. Photoshop, Illustrator, InDesign,
            Lightroom or Xd are some kind of industry standards and I love working with them. I'm
            not limited to them, though: Gimp, Inkscape or Figma are also very valid applications
            that I've been working with.
          </p>
          <p>
            User interfaces, brochures, books, branding... You name it! As I mentioned, creating
            pretty things is particularly important for me.
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
  props: {},
};
</script>

<style scoped>
#about {
  height: 100%;
  min-height: 100vh;
  font-size: 1.4rem;
  position: relative;
  background: #fafafa;
  clip-path: polygon(0 0, 20% 5%, 100% 0, 100% 100%, 80% 95%, 0 100%);
  z-index: 5;
  background: #fafafa url(https://raw.githubusercontent.com/yagoestevez/fcc-portfolio/master/src/Images/Author_BG.jpg) center right no-repeat;
  background-attachment: fixed;
}

#about .wrapper {
  padding: 15rem 10rem 12rem;
  height: 100%;
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
}

#about article {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  padding: 3rem 0;
}

#about .title {
  grid-column-end: span 4;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#about .title h3 {
  font-size: 2.4rem;
}

#about .separator {
  background: #f300b4;
  width: 150px;
  height: 2px;
  margin: 1rem 0;
  padding: 0;
}

#about .subtitle {
  font-size: 1.6rem;
  text-align: center;
  color: inherit;
  padding-bottom: 1.5rem;
}

#about p {
  padding-bottom: 1.5rem;
  color: #555;
  line-height: 1.9rem;
}

#about .desc.full {
  grid-column-end: span 4;
  margin-bottom: 2rem;
}

#about .desc {
  grid-column-end: span 2;
  background: #ffffffaa;
  padding: 2rem;
  text-align: justify;
}

@media only screen and (max-width: 1149px) {
  #about article {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }
  #about .desc.full {
    grid-column-end: -1;
  }

  #about .desc {
    grid-column-end: -1;
  }
}
@media only screen and (max-width: 949px) {
  #about {
    clip-path: polygon(0 0, 20% 2%, 100% 0, 100% 100%, 80% 98%, 0 100%);
    background-position: top left;
    background-size: cover;
  }
}
@media only screen and (max-width: 649px) {
  #about .wrapper {
    padding: 10rem 2rem 8rem;
  }
}
</style>
