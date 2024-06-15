<template>
  <div class="section__main__credit">
    <div class="section__main__credit__title">2/3 Кредитные предложения</div>

    <div class="section__main__credit__filter">
      <v-btn-toggle v-model="credit__type" class="credit-btn-toggle">
        <v-btn>Все</v-btn>
        <v-btn>Кредит</v-btn>
        <v-btn>Рассрочка</v-btn>
      </v-btn-toggle>
      <v-btn-toggle v-model="credit__filter" class="credit-btn-toggle">
        <v-btn>По банкам</v-btn>
        <v-btn>По сроку</v-btn>
      </v-btn-toggle>
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

          <div
            v-for="item in freedom"
            :key="item.id"
            class="section__main__credit__table__item__row"
          >
            <div>
              <v-radio :value="item.radio__val"></v-radio>
            </div>
            <div class="section__main__credit__table__item__row__type">
              {{ item.type }}
            </div>

            <div class="section__main__credit__table__item__row__price">
              Платеж: <strong>{{ item.price }} тенге</strong>
            </div>
            <div class="section__main__credit__table__item__row__prefix">x</div>
            <div class="section__main__credit__table__item__row__period">
              {{ item.period }} месяца
            </div>
          </div>
        </div>
      </div>
    </v-radio-group>

    <div class="section__main__action">
      <v-btn class="section__main__action__btn"> Оформить кредит </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credit__type: 0,
      credit__filter: 0,
      radios: null,
      freedom: [
        {
          id: 1,
          type: "Кредит",
          radio__val: "1",
          price: "3352",
          period: "24",
        },
        {
          id: 2,
          type: "Кредит",
          radio__val: "2",
          price: "3352",
          period: "12",
        },
        {
          id: 3,
          type: "Рассрочка",
          radio__val: "3",
          price: "3352",
          period: "24",
        },
      ],
    };
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
