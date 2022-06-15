<template>
  <div class="survey">
    <ValidationObserver ref="encuesta">
      <form
        class="questions"
        @submit.prevent="surveyId ? updateSurvey() : addSurvey()"
      >
        <h1>Encuestas Personales</h1>
        <ValidationProvider
          name="Nombre"
          rules="required|alpha_spaces"
          v-slot="{ errors }"
        >
          <div class="field">
            <label for="" class="required"> Escribe tu nombre completo </label>
            <input type="text" v-model="survey.name" />
            <small class="text-danger" v-if="errors.length">
              {{ errors[0] }}
            </small>
          </div>
        </ValidationProvider>

        <ValidationProvider
          name="Email"
          rules="required|email"
          v-slot="{ errors }"
        >
          <div class="field">
            <label for="" class="required"> Escribe tu correo </label>
            <input type="email" v-model="survey.email" />
            <small class="text-danger" v-if="errors.length">
              {{ errors[0] }}
            </small>
          </div>
        </ValidationProvider>

        <ValidationProvider
          name="Curp"
          rules="required|alpha_num"
          v-slot="{ errors }"
        >
          <div class="field">
            <label for="" class="required">Escribe tu CURP</label>
            <input type="text" v-model="survey.curp" />
            <small class="text-danger" v-if="errors.length">
              {{ errors[0] }}
            </small>
          </div>
        </ValidationProvider>

        <ValidationProvider
          name="Entidad federativa"
          rules="required"
          v-slot="{ errors }"
        >
          <div class="field">
            <label for="" class="required"
              >Entidad federativa de Residencia</label
            >
            <select v-model="survey.federalEntity">
              <option value="Veracruz" selected>
                Veracruz
              </option>
                <option value="Nuevo León" selected>
                Nuevo León
              </option>
                <option value="Puebla" selected>
                Puebla
              </option>
            </select>
            <small class="text-danger" v-if="errors.length">
              {{ errors[0] }}
            </small>
          </div>
        </ValidationProvider>

        <ValidationProvider
          name="Numero de contacto"
          rules="required|numeric|min:10|max:10"
          v-slot="{ errors }"
        >
          <div class="field">
            <label for="" class="required">Numero de contacto</label>
            <input type="text" v-model="survey.phone" />
            <small class="text-danger" v-if="errors.length">
              {{ errors[0] }}
            </small>
          </div>
        </ValidationProvider>

        <div v-if="!surveyId">
          <button class="btn-pm">Registrar encuesta</button>
        </div>
        <div v-else>
          <button class="btn-pm btn-udt">Actualizar encuesta</button>
          <router-link to="/surveys" class="btn-dg btn-link">
            Cancelar
          </router-link>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { collection, getDoc, addDoc, updateDoc, doc } from "firebase/firestore";

export default {
  props: ["surveyId"],
  data() {
    return {
      survey: {
        name: "",
        email: "",
        curp: "",
        federalEntity: "",
        phone: "",
      },
    };
  },
  mounted() {
    if (this.surveyId) this.editSurvey();
  },
  methods: {
    async addSurvey() {
      const validate = await this.validateFields();

      if (validate) {
        const resetForm = {
          name: "",
          email: "",
          curp: "",
          federalEntity: "",
          phone: "",
        };

        try {
          await addDoc(collection(window.db, "surveys"), this.survey);
          await this.submitEmail();

          this.survey = resetForm;

          this.$refs.encuesta.reset();

          window.Swal.fire(window.SwalStore);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    },
    async editSurvey() {
      const survey = await getDoc(doc(window.db, "surveys", this.surveyId));
      this.survey = survey.data();
    },
    async updateSurvey() {
      const validate = await this.validateFields();

      if (validate) {
        try {
          await updateDoc(
            doc(window.db, "surveys", this.surveyId),
            this.survey
          );

          this.$router.push("/surveys");

          window.Swal.fire(window.SwalUpdate);
        } catch (e) {
          console.error("Error updating document: ", e);
        }
      }
    },
    async validateFields() {
      return await this.$refs.encuesta.validate().then((success) => {
        return success;
      });
    },
    async submitEmail() {
      // Make Form Data
      let formData = new FormData();

      // Set Form Data Values
      formData.append("name", this.survey.name);
      formData.append("email", this.survey.email);

      return await fetch("php/form.php", { method: "POST", body: formData });
    },
  },
};
</script>

