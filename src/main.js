import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { ValidationProvider, ValidationObserver, setInteractionMode, localize } from 'vee-validate/dist/vee-validate.full.esm';
import es from 'vee-validate/dist/locale/es.json';

Vue.config.productionTip = false

// TODO: Config Vee Validate
// Vee Validate Tipo de Validacion
setInteractionMode('lazy');

// Cambiar a Español Vee Validate
localize('es', es);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// TODO: Config Sweet Alert
window.Swal = require('sweetalert2');

window.SwalStore = {
  icon: "success",
  title: "¡Informacion registrada!",
  text: "Informacion registrada exitosamente."
}
window.SwalUpdate = {
  icon: "success",
  title: "¡Informacion actualizada!",
  text: "Se ha actualizado el registro exitosamente."
}
window.SwalError = {
  icon: "error",
  title: "Algo salio mal...",
  text: "Por favor intentalo de nuevo mas tarde."
}

// TODO: Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAARqk0yBEcsr1Lr4eLjapk-asBbkUf4K8",
  authDomain: "questions-52eca.firebaseapp.com",
  projectId: "questions-52eca",
  storageBucket: "questions-52eca.appspot.com",
  messagingSenderId: "126274289889",
  appId: "1:126274289889:web:d30e408b3e8ce68d3e77a0"
};

const initFirebase = initializeApp(firebaseConfig);
window.db = getFirestore(initFirebase);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
