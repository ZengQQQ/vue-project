<template>
  <section id="contact">
    <div class="container">
      <div class="heading-wrapper">
        <div class="heading">
          <p class="title">
            Want to <br />
              contact us?
          </p>
          <p class="separator" />
          <p class="subtitle">
            Please, use the form below or send an email to us：
            <span class="mail">
              consTest
              <i class="fas fa-at at"/>
              @eamils
              <i class="fas fa-circle dot"/>
              .bjut.edu.cn
            </span>
            :
          </p>
        </div>
        <SocialLinks />
      </div>
      <form id="contact-form" action="#">
        <input placeholder="Name" name="name" type="text" required />
        <input placeholder="Email" name="email" type="email" required />
        <textarea placeholder="Message" type="text" name="message" />
        <input class="button" id="submit" value="Submit" type="submit" />
      </form>
    </div>
  </section>
</template>

<script>
import SocialLinks from '@/components/rootCops/SocialLinks.vue'; // Assuming the SocialLinks component is in the same directory

export default {
  components: {
    SocialLinks
  }
};
</script>

<style scoped>
/* Paste the CSS styles from the original Contact component here */

 #contact {
  background: #181d23 url(https://raw.githubusercontent.com/yagoestevez/fcc-portfolio/master/src/Images/envelope.svg?sanitize=true) no-repeat right;
  clip-path: polygon(0 0, 20% 100px, 100% 0, 100% 100%, 0 100%);
  color: #fafafa;
  min-height: 100vh;
  width: 100%;
  /* padding: 5rem 3rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: -100px 0 140px;
  z-index: 1;
}

#contact .container {
  width: 80%;
  max-width: 1400px;
  padding: 25vh 0;
}

#contact .container .heading-wrapper {
  display: flex;
  justify-content: space-between;
}

#contact .heading-wrapper .social a {
  color: #fafafa;
}

#contact .heading-wrapper .social a:hover {
  color: #f300b4;
}

.heading-wrapper .heading .title {
  font-size: 3rem;
  line-height: 2.4rem;
}

.heading-wrapper .heading .separator {
  background: #f300b4;
  width: 150px;
  height: 2px;
  margin: 1rem 0;
}

.heading-wrapper .heading .subtitle {
  font-size: 1.4rem;
}

#contact-form {
  margin-top: 1rem;
}

input, textarea {
  border: none;
  padding: 1rem;
  font-family: 'Overlock', Arial, Helvetica, sans-serif;
  width: 100%;
  height: 40%;
  transition: 200ms;
}

input[type="text"],
input[type="email"],
input[type="text"]:not(output):not(:focus),
input[type="email"]:not(output):not(:focus),
textarea {
  border-bottom: 1px solid #fafafa;
  background: transparent;
  color: #fafafa;
  font-size: 1.8rem;
  box-shadow: none;
  outline: none;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="text"]:not(output):focus,
input[type="email"]:not(output):focus,
textarea:focus {
  border-bottom: 1px solid #f300b4;
}

input[type="submit"] {
  background: #f300b4;
  color: #fafafa;
  margin-top: 1rem;
  width: auto;
  float: right;
}

input[type="submit"]:hover,
input[type="submit"]:focus {
  cursor: pointer;
  color: #333;
  background: #fafafa;
}

::placeholder {
  color: #fafafa;
}

/** Email to avoid spam **/
.mail {
  display: inline-block;
  font-style: italic;
}

.mail .at, .mail .dot {
  font-size: .9rem;
  margin: 0 .1rem;
  color: #f300b4;
}


@media only screen and (max-width: 1149px) {
  #contact .social a {
    display: block;
  }
}

@media only screen and (max-width: 649px) {
  #contact {
    clip-path: polygon(0 0, 20% 5%, 100% 0, 100% 100%, 0 100%);
    padding: 0;
  }
}


</style>
