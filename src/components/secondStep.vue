<template>
  <div class="section__main__credit">
    <div class="section__main__credit__title">
      2/3 Выбор предложения и оформление
    </div>
    <div
      v-if="!approved?.length"
      style="display: flex; justify-content: center"
    >
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <div v-else>
      <div class="section__main__credit__filter">
        <v-btn-toggle v-model="loan" class="credit-btn-toggle">
          <v-btn value="all">Все</v-btn>
          <v-btn value="loan">Кредит</v-btn>
          <v-btn value="installment">Рассрочка</v-btn>
        </v-btn-toggle>
        <!-- <v-btn-toggle v-model="credit__filter" class="credit-btn-toggle">
          <v-btn>По банкам</v-btn>
          <v-btn>По сроку</v-btn>
        </v-btn-toggle> -->
      </div>

      <v-radio-group v-model="radios">
        <div class="section__main__credit__table">
          <div class="section__main__credit__table__item">
            <div class="section__main__credit__table__item__header">
              <div class="section__main__credit__table__item__header__title">
                <img src="@/assets/freedom-icon.svg" alt="" />
                <span>ТОО FREEDOM FINANCE</span>
              </div>
              <v-chip color="green" variant="flat"> Одобренно </v-chip>
            </div>

            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Выбрать</th>
                  <th class="text-left">Тип</th>
                  <th class="text-left">Всего</th>
                  <th class="text-left">Срок</th>
                  <th class="text-left">Платеж за месяц</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in approvedFilter" :key="item.name">
                  <td><v-radio :value="item.id"></v-radio></td>
                  <td>
                    {{ item.productType === "loan" ? "Кредит" : "Рассрочка" }}
                  </td>
                  <td>{{ item.loanAmount + " ₸" }}</td>
                  <td>{{ item.loanLength + " мес" }}</td>
                  <td>{{ item.monthlyPayment + " ₸" }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </div>
      </v-radio-group>
    </div>

    <div class="section__main__action">
      <v-btn class="section__main__action__btn" @click="requestConfirm">
        Оформить кредит
      </v-btn>
    </div>
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
      credit__type: 0,
      credit__filter: 0,
      radios: null,
      request: null,
      status: null,
      intervalId: null,
      approved: [],
      message: null,
      loan: "all",
    };
  },
  computed: {
    approvedFilter() {
      return this.approved.filter((item) => {
        if (this.loan === "all") {
          return true; // Показываем все элементы, если выбрано "all"
        } else {
          return item.productType === this.loan;
        }
      });
    },
    approvedItem() {
      return this.approved.find((loan) => loan.id === parseInt(this.radios));
    },
  },
  watch: {
    status(newValue) {
      if (newValue != "PROCESSING") {
        clearInterval(this.intervalId);
      }
    },
  },
  mounted() {
    this.requestInfo();
    this.requestResult();
    this.intervalId = setInterval(() => {
      this.requestResult();
    }, 5000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    async requestConfirm() {
      if (this.radios) {
        try {
          const response = await axios.post(`iframe_scoring_confirm`, {
            scoring_id: this.scoringId,
            company_id: this.request.company_id,
            offer: this.approvedItem,
          });
          console.log("Res", response.data.data);
          if (response.data.success) {
            this.$emit("confirm");
          }
        } catch (error) {
          console.error(error);
          alert("Что-то пошло не так");
        } finally {
          this.$emit("confirm");
        }
      } else {
        alert("Выберите одно из предложений");
      }
    },
    async requestInfo() {
      try {
        const response = await axios.post(
          `iframe_scoring_info/${this.scoringId}`
        );
        console.log("Res", response.data.data);
        this.request = response.data.data;
        this.$emit("scoring-info", this.request);
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
        this.approved = response.data.data.approved;
        if (response.data.data.message) {
          this.message = response.data.data.message;
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
