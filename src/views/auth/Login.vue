<template>
  <div class="auth-content">
    <form action="" @submit.prevent="login">
      <div class="field">
        <label for="">Email</label>
        <input type="text" v-model="auth.email" />
      </div>
      <div class="field">
        <label for="">Contraseña</label>
        <input type="text" v-model="auth.password" />
      </div>
      <button class="btn-pm">Ingresar</button>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      auth: {
        email: "dev@dev.com",
        password: "123456",
      },
    };
  },
  methods: {
    login() {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, this.auth.email, this.auth.password)
        .then((userCredential) => {
          console.log(userCredential.user);
          // Signed in
          //   const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          console.log(error);
          //   const errorCode = error.code;
          //   const errorMessage = error.message;
        });
    }
  },
};
</script>