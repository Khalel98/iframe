<template>
  <div class="section__main__credit">
    <div class="section__main__credit__title">3/3 Статус заявки</div>
    <div
      class="section__main__credit__title"
      v-if="message"
      style="font-size: 14px"
    >
      {{ message }}
    </div>

    <div>
      <div class="" v-if="products">
        <div class="">
          <div class="section__main__product__item__block__text">
            <div class="section__main__product__item__block__name">
              <strong>Название филиала:</strong> {{ products?.filial_name }}
            </div>
            <div class="section__main__product__item__block__name">
              <strong>ИИН:</strong> {{ products?.iin }}
            </div>
            <div class="section__main__product__item__block__name">
              <strong>Телефон:</strong> {{ products?.phone }}
            </div>
            <div class="section__main__product__item__block__name">
              <strong>Срок:</strong> {{ products?.period }}
            </div>
            <div>
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Модель</th>
                    <th class="text-left">Категория</th>
                    <th class="text-left">Количество</th>
                    <th class="text-left">Цена</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in products.product" :key="item.product_id">
                    <td>{{ item.product_id }}</td>
                    <td>{{ item.model }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.cost + " ₸" }}</td>
                  </tr>
                </tbody>
              </v-table>
            </div>
          </div>
        </div>
      </div>

      <div
        style="display: flex; justify-content: center"
        v-if="status === 'APPROVED'"
      >
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
  },
  data() {
    return {
      status: null,
      intervalId: null,
      message: null,
      loan: "all",
      products: null,
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
    async requestInfo() {
      try {
        const response = await axios.post(
          `iframe_scoring_info/${this.scoringId}`
        );
        console.log("Res", response.data.data);
        this.products = response.data.data;
      } catch (error) {
        console.error(error);
        alert("Что-то пошло не так");
      }
    },
    async requestResult() {
      try {
        const response = await axios.post(
          `iframe_scoring_result/${this.scoringId}`
        );
        console.log("Res", response.data.data);
        this.status = response.data.data.status;
        if (
          response.data.data.status === "REJECTED" ||
          response.data.data.status === "REFUND" ||
          response.data.data.status === "FAILED"
        ) {
          this.message = response.data.data.message;
        } else if (response.data.data.status === "ISSUED") {
          this.requestInfo();
        }
      } catch (error) {
        console.error(error);
        alert("Что-то пошло не так");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
