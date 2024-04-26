<script>

import { ref,onMounted} from "vue";
import Particles from "@tsparticles/vue3";
export default {
  
  setup() {
    const themeOption = ref(false);

    const particlesOption = ref({
      fpsLimit: 60,
      particles: {
        move: {
          bounce: false,
          direction: "none",
          enable: true,
          outModes: "out",
          random: false,
          speed: 2,
          straight: false,
        },
        number: { density: { enable: true, area: 800 }, value: 100},
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 6 },
        },
      },
      themes: [
        {
          name: "light",
          default: {
            value: true,
            mode: "light",
          },
          options: {
            background: {
              color: "#fff",
            },
            particles: {
              color: {
                value: "#000",
              },
            },
          },
        },
        {
          name: "dark",
          default: {
            value: true,
            mode: "dark",
          },
          options: {
            background: {
              color: "#000",
            },
            particles: {
              color: {
                value: "#fff",
              },
            },
          },
        },
      ],
    });

    const particlesInstance = ref(null);

    // onMounted(() => {
    //   loadFull(particlesOption).then((container) => {
    //     particlesInstance.value = container;
    //     console.log("Particles instance loaded", container);
    //   }).catch((error) => {
    //     console.error("Error loading particles instance", error);
    //   });
    // });
    // const toggleTheme = () => {
    //   console.log(
    //     "Theme toggled. Current themeOption value:",
    //     themeOption.value
    //   );
    //   if (particlesInstance) {
    //     console.log("Particles instance exists. Loading theme...");
    //     particlesInstance.value.loadTheme(themeOption.value ? "dark" : "light");
    //   } else {
    //     console.error("Particles instance not found.");
    //   }
    // };

    const particlesLoaded = (container) => {
      console.log("Particles loaded", container);
      particlesInstance.value = container;
    };
    // 暴露给模板的响应式数据和方法
    return {
      particlesOption,
      particlesLoaded,    
    };
  },
};
</script>

<template>
  <vue-particles
    id="tsparticles"
    :particlesLoaded="particlesLoaded"
    :options="particlesOption"
  />
  <!-- <div id="theme">
    <button type="button" id="btnLight">Light</button>
    <button type="button" id="btnDark">Dark</button>
    <el-switch
      v-model="themeOption"
      active-text="Dark"
      inactive-text="Light"
      @change="toggleTheme"
    />
  </div> -->
</template>

<style>
/* ---- reset ---- */
#theme {
  position: fixed;
  top: 15px;
  right: 15px;
}

/* ---- reset ---- */
.github {
  bottom: 10px;
  right: 10px;
  position: fixed;
  border-radius: 10px;
  background: #fff;
  padding: 0 12px 6px 12px;
  border: 1px solid #000;
}

.github a:hover,
.github a:link,
.github a:visited,
.github a:active {
  color: #000;
  text-decoration: none;
}

.github img {
  height: 30px;
}

.github #gh-project {
  font-size: 20px;
  padding-left: 5px;
  font-weight: bold;
  vertical-align: bottom;
}
</style>
