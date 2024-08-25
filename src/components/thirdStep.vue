<template>
  <div class="section__main__credit">
    <div class="section__main__credit__title">3/3 Статус заявки</div>

    <div>
      <!-- <pre>{{ requestInfo }}</pre> -->
      <div class="section__main__product__item">
        <div class="section__main__product__item__block">
          <div class="section__main__product__item__block__text">
            <div class="section__main__product__item__block__name">
              <strong>Название филиала:</strong> {{ requestInfo.filial_name }}
            </div>
            <div class="section__main__product__item__block__name">
              <strong>ИИН:</strong> {{ requestInfo.iin }}
            </div>
            <div class="section__main__product__item__block__name">
              <strong>Телефон:</strong> {{ requestInfo.phone }}
            </div>
            <div class="section__main__product__item__block__name">
              <strong>Срок:</strong> {{ requestInfo.period }}
            </div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>

    <!-- <div class="section__main__action">
      <v-btn class="section__main__action__btn"> Оформить кредит </v-btn>
    </div> -->
  </div>
</template>

<script>
import axios from "@/axios";
export default {
  props: {
    scoringId: {
      type: Number,
      default: null,
    },
    requestInfo: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      status: null,
      intervalId: null,
      message: null,
      loan: "all",
    };
  },
  computed: {},
  watch: {
    status(newValue) {
      if (newValue != "APPROVED") {
        clearInterval(this.intervalId); // Clear the interval when the component is destroyed
      }
    },
  },
  mounted() {
    this.requestResult();
    this.intervalId = setInterval(() => {
      this.requestResult();
    }, 5000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId); // Clear the interval when the component is unmounted
  },
  methods: {
    async requestResult() {
      try {
        const response = await axios.post(
          `iframe_scoring_result/${this.scoringId}`
        );
        console.log("Res", response.data.data);
        this.status = response.data.data.status;
        // this.approved = response.data.data.approved;
        // if (response.data.data.message) {
        //   this.message = response.data.data.message;
        // }
      } catch (error) {
        console.error(error);
        alert("Что-то пошло не так");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
