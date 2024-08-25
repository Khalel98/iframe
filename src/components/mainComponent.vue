<template>
  <div class="section__main">
    <div class="section__main__content _container">
      <div class="section__main__header">
        <div class="section__main__header__mobile">
          <img src="@/assets/logo.svg" alt="" />
        </div>
        <div class="section__main__header__item">
          <strong>Кол-во товаров:</strong>
          <span>{{ items?.credit_goods?.length }} </span>
        </div>
        <img
          class="section__main__header__desctop"
          src="@/assets/logo.svg"
          alt=""
        />
        <div class="section__main__header__item">
          <strong>Итого:</strong> <span>{{ items?.principal }} </span>
        </div>
      </div>

      <firstStep v-if="status === 1" :items="items" @scoring="scoringResult" />
      <secondStep
        v-if="status === 2"
        :scoringId="scoringId"
        @confirm="this.status = 3"
        @scoring-info="getInfo"
      />
      <thirdStep
        v-if="status === 3"
        :scoringId="scoringId"
        :requestInfo="requestInfo"
      />
    </div>
  </div>
</template>

<script>
import firstStep from "@/components/firstStep.vue";
import secondStep from "@/components/secondStep.vue";
import thirdStep from "@/components/secondStep.vue";

export default {
  components: {
    firstStep,
    secondStep,
    thirdStep,
  },
  data() {
    return {
      token: null,
      user: null,
      status: 1,
      data: null,
      scoringId: null,
      items: {},
      requestInfo: null,
    };
  },
  created() {
    window.addEventListener("message", this.handleMessage);
  },
  beforeUnmount() {
    window.removeEventListener("message", this.handleMessage);
  },
  methods: {
    scoringResult(val) {
      this.status = 2;
      this.scoringId = val;
    },

    getInfo(val) {
      this.requestInfo = val;
    },
    handleMessage(event) {
      const trustedOrigins = ["http://localhost:3000", "http://127.0.0.1:5501"];

      if (!trustedOrigins.includes(event.origin)) {
        console.log("Недоверенный источник:", event.origin);
        return;
      }
      console.log("Получено сообщение:", event.data);

      if (event.data.token) {
        this.$store.commit("setToken", event.data.token);
        this.$store.commit("setProduct", event.data.items);
        this.token = event.data.token; // Сохраняем токен в данных компонента
        this.items = event.data.items; // Сохраняем пользователя в данных компонента
      }
    },
  },
};
</script>
