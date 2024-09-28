<script setup>
import Button from '@/components/ui/button/button.vue'
import Input from '@/components/ui/input/input.vue'
import FormItem from '@/components/ui-extend/form/form-item.vue'

import { pages } from '@/config/project/index.js'
import { useRouter } from 'vue-router'

import { reactive } from 'vue'
import { setBasicUiValidation } from '@/compositions/ui/setBasicUiValidation.js'
import db from '@/core/db/db'
import {useUser} from "@/stores/user";

const router = useRouter()
const userStore = useUser()

if (userStore.accessToken) {
  router.push(pages.home)
}

const form = reactive({
  email: '',
  password: '',
})

const schema = reactive({
  email: {
    type: 'email',
    placeholder: 'Введите почту',
    email: true,
    error: '',
  },
  password: {
    type: 'password',
    placeholder: 'Введите пароль',
    require: true,
    error: '',
  },
})
const { validate, hasErrors } = setBasicUiValidation(form, schema)

function generateToken(length = 16) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

const submit = async () => {
  await validate()
  if (hasErrors.value) return

  const accessToken = generateToken()
  userStore.$patch((state) => {
    state.accessToken = accessToken
    db.set('rgd-access', accessToken)
  })
  router.push(pages.home)
}
</script>

<template>
  <section>
    <form
      class="flex flex-col items-center gap-6 min-w-96 bg-gradient-dark px-4 py-8 rounded-sm"
      novalidate
      @submit.prevent="submit">
      <h1>Авторизация</h1>
      <FormItem
        v-for="(item, key) in schema"
        :key="key"
        :error="item.error">
        <Input
          v-model="form[key]"
          :class="{ 'border-2 border-red-base' : item.error }"
          :native-type="item.type"
          :placeholder="item.placeholder"
        />
      </FormItem>
      <Button
        class="mt-4"
        type="red"
        native-type="submit">
        Войти
      </Button>
    </form>
  </section>
</template>
