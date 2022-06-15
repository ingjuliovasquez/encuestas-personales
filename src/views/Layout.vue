<template>
  <div>
    <!-- Header -->
    <div class="header">
      <img
        src="@/assets/img/logo-header.png"
        alt=""
        style="width: 228px"
        class="logo-header"
      />
      <button class="btn-dg" @click.prevent="logout" v-if="isAuth">
        Cerrar Sesion
      </button>
    </div>

    <!-- Main container -->
    <div class="main-container">
      <router-view />
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="left">
        <img
          width="300"
          height="107"
          src="@/assets/img/tranparente_logo.png"
          alt=""
        />
        <h5>55 3622 2800</h5>
        <h5> Encuestas Personales </h5>
        <p class="p-left">
          Blvd. Adolfo López Mateos 91, El Potrero, 52975 Cd <br />
          López Mateos, Méx.
        </p>
      </div>
      <div class="center">
        <h5>Módulo de atención ciudadana</h5>
        <p>
          Lunes a viernes de 8:00 a.m. a 6:00 p.m <br />
          Blvd. Adolfo López Mateos 91, Palacio Municipal
        </p>
        <h5>Reporte en línea</h5>
        <a href="https://EncuestasPersonales.mx/" target="_blank"
          >https://juliovasquez.dev/</a
        >
      </div>
      <div class="right">
        <h5>Servicios públicos</h5>
        <span>072</span>
        <h5>Emergencias</h5>
        <span>911</span>
        <h5>Acércate</h5>
        <a href="https://www.facebook.com/personal" target="_blank">
          <img
            class=""
            src="@/assets/img/facebook.png"
            alt=""
            width="30"
            height="auto"
          />
        </a>
        <a href="https://twitter.com/personal" target="_blank">
          <img
            class=""
            src="@/assets/img/twitter.png"
            alt=""
            width="30"
            height="auto"
          />
        </a>
        <a
          href="https://www.youtube.com"
          target="_blank"
        >
          <img
            class=""
            src="@/assets/img/youtube.png"
            alt=""
            width="30"
            height="auto"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      isAuth: false,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) this.isAuth = true;
      else this.isAuth = false;
    });
  },
  methods: {
    async logout() {
      const auth = getAuth();
      await signOut(auth);
    },
  },
};
</script>