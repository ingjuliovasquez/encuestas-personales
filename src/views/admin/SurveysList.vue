<template>
  <div class="survey-list">
    <h1>Encuestas realizadas</h1>
    <h4 v-if="!surveys.length">Aun no hay encuestas registradas...</h4>
    <table v-if="surveys.length">
      <thead>
        <th>Nombre</th>
        <th>Email</th>
        <th>Curp</th>
        <th>Ent. Federal</th>
        <th>Telefono</th>
        <th>Opciones</th>
      </thead>
      <tbody>
        <tr v-for="(survey, index) in surveys" :key="index">
          <td>{{ survey.name }}</td>
          <td>{{ survey.email }}</td>
          <td>{{ survey.curp }}</td>
          <td>{{ survey.federalEntity }}</td>
          <td>{{ survey.phone }}</td>
          <td>
            <a class="btn-link bg-pm" href="#" @click.prevent="editSurvey(survey.id)">Editar</a> |
            <a class="btn-link bg-dg" href="#" @click.prevent="deleteSurvey(survey.id)">Eliminar</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";

export default {
  data() {
    return {
      surveys: [],
    };
  },
  async mounted() {
    await this.getSurveys();
  },
  methods: {
    async getSurveys() {
      this.surveys = [];

      //* Read data to firebase
      const data = await getDocs(collection(window.db, "surveys"));

      data.forEach((survey) => {
        let surv = {
          id: survey.id,
          curp: survey.data().curp,
          email: survey.data().email,
          federalEntity: survey.data().federalEntity,
          name: survey.data().name,
          phone: survey.data().phone,
        };

        this.surveys.push(surv);
      });
    },
    editSurvey(surveyId) {
      this.$router.push(`/survey/${surveyId}`);
    },
    async deleteSurvey(surveyId) {
      window.Swal.fire({
        title: "¿Desea eliminar esta encuesta?",
        text: "No se podran recuperar los datos una vez eliminados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          //* Delete data to firebase
          await deleteDoc(doc(window.db, "surveys", surveyId));
          await this.getSurveys();

          window.Swal.fire("Eliminado!", "Registro eliminado.", "success");
        }
      });
    },
  },
};
</script>
