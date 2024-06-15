<template>
  <div class="section__main">
    <div class="section__main__content _container">
      <div class="section__main__header">
        <div class="section__main__header__item">
          <strong>Кол-во товаров:</strong> <span>2 </span>
        </div>
        <img src="@/assets/logo.svg" alt="" />
        <div class="section__main__header__item">
          <strong>Итого:</strong> <span>10000 </span>
        </div>
      </div>

      <firstStep v-if="status" :items="items" @change="status = !status" />
      <secondStep v-else />
    </div>
  </div>
</template>

<script>
import firstStep from "@/components/firstStep.vue";
import secondStep from "@/components/secondStep.vue";
export default {
  components: {
    firstStep,
    secondStep,
  },
  data() {
    return {
      status: true,
      items: [
        {
          id: 1,
          img: "",
          quantity: 3,
          name: "test",
          price: 3000,
        },
      ],
    };
  },
};
</script>
