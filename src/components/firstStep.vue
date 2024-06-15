<template>
  <div class="section__main__product">
    <div
      v-for="item in items"
      :key="item.id"
      class="section__main__product__item"
    >
      <div class="section__main__product__item__block">
        <img
          :src="item.img"
          alt=""
          class="section__main__product__item__block__img"
        />
        <div class="section__main__product__item__block__text">
          <div class="section__main__product__item__block__quantity">
            Количество: {{ item.quantity }}
          </div>
          <div class="section__main__product__item__block__name">
            Наименование товара: {{ item.name }}
          </div>
        </div>
      </div>

      <div class="section__main__product__item__price">
        Цена: {{ item.price }}
      </div>
    </div>
  </div>

  <div class="section__main__form">
    <div class="section__main__form__title">1/3 Ваши данные</div>

    <v-form ref="form">
      <div class="section__main__form__body">
        <div class="section__main__form__body__item">
          <v-text-field
            variant="outlined"
            v-model="iin"
            :counter="12"
            :rules="[
              (v) => !!v || 'Заполните',
              (v) => /^[0-9]{12}$/.test(v) || 'ИИН должен содержать 12 цифр',
            ]"
            label="ИИН заемщика"
            required
            block
          ></v-text-field>
        </div>
        <div class="section__main__form__body__item">
          <v-text-field
            variant="outlined"
            v-model="phone"
            :counter="11"
            :rules="[
              (v) => !!v || 'Номер телефона',
              (v) =>
                /^[0-9]{11}$/.test(v) ||
                'Номер телефона должен содержать 11 цифр',
            ]"
            label="Номер телефона"
            required
            block
          ></v-text-field>
        </div>
      </div>
    </v-form>
  </div>

  <div class="section__main__info">
    <p class="section__main__info__paragraph">1. Введите код из SMS</p>
    <p class="section__main__info__paragraph">
      2. Код подтверждения будет отправлен на номер: {{ phone }}
    </p>
    <p class="section__main__info__paragraph">
      Подтверждая номер телефона из SMS, вы соглашаетесь со сбором и обработкой
      ваших данных, предоставлением информации и получением отчета из кредитного
      бюро и вы ознакомлены и согласны с <span>полным текстом согласий</span>
    </p>
  </div>
  <div class="section__main__action">
    <v-btn class="section__main__action__btn" @click="validate">
      Подтвердить смс кодом
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      iin: "",
      phone: "",
    };
  },

  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.$emit("change");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
