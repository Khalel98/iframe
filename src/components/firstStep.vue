<template>
  <div class="section__main__product">
    <div
      v-for="item in items?.credit_goods"
      :key="item.product_id"
      class="section__main__product__item"
    >
      <div class="section__main__product__item__block">
        <!-- <img
          :src="item.img"
          alt=""
          class="section__main__product__item__block__img"
        /> -->
        <div class="section__main__product__item__block__text">
          <div class="section__main__product__item__block__quantity">
            Количество: {{ item.quantity }}
          </div>
          <div class="section__main__product__item__block__name">
            Наименование товара: {{ item.model }}
          </div>
          <div class="section__main__product__item__block__name">
            Категория: {{ item.category }}
          </div>
        </div>
      </div>

      <div class="section__main__product__item__price">
        Цена: {{ item.cost }}
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
            :rules="[
              (v) => !!v || 'Номер телефона',
              // (v) =>
              //   /^[0-9]{12}$/.test(v) ||
              //   'Номер телефона должен содержать 11 цифр',
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

  <v-dialog v-model="otpDialog" width="auto">
    <v-card>
      <div class="section__auth__modal" style="padding: 20px">
        <v-otp-input
          v-model="code"
          :loading="loading"
          length="4"
          variant="underlined"
        ></v-otp-input>
        <v-btn
          :disabled="code.length < 4"
          class="mt-4"
          color="grey-darken-4"
          block
          @click="scoring"
        >
          Подтвердить
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "@/axios";
export default {
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      iin: "981130350514",
      phone: "+77752823378",
      code: "",
      otpDialog: false,
      loading: false,
    };
  },
  methods: {
    acceptSms() {
      this.smsValidate();
      this.otpDialog = true;
    },
    async smsValidate() {
      this.loading = true;
      try {
        const response = await axios.post("iframe_send_sms", {
          iin: this.iin,
          mobile_phone: this.phone,
          accepted: 1,
        });
        console.log("Res", response.data);
        if (response.data.success) {
          alert(response.data.data.data);
        } else {
          alert("Что-то пошло не так");
        }
      } catch (error) {
        console.error(error);
        alert("Что-то пошло не так");
      } finally {
        this.loading = false;
        this.dialog = false;
      }
    },
    async scoring() {
      try {
        const response = await axios.post("iframe_scoring", {
          iin: this.iin,
          mobile_phone: this.phone, // Тел. заемщика
          principal: this.items?.principal, // общая стоимость
          code: this.code, // код смс
          credit_goods: this.items?.credit_goods,
        });
        console.log("Res", response.data);
        this.$emit("scoring", response.data.scoring_id);
      } catch (error) {
        console.error(error);
        alert("Что-то пошло не так");
      }
    },

    async validate() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        this.acceptSms();
      }
    },

    handleMessage(event) {
      if (event.origin !== "https://your-parent-origin.com") {
        return; // Проверяем origin, чтобы убедиться, что сообщение пришло от ожидаемого источника
      }
      console.log("Получено сообщение:", event.data); // Здесь вы обрабатываете данные
      if (event.data.token) {
        // Делаем что-то с токеном, например сохраняем его в состояние компонента
        this.token = event.data.token;
      }
    },

    created() {
      window.addEventListener("message", this.handleMessage);
    },

    beforeUnmount() {
      window.removeEventListener("message", this.handleMessage);
    },
  },
};
</script>

<style lang="scss" scoped></style>
