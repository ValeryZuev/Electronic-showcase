import { ref, watch } from 'vue'

const REFINES = {
  require: (value) => ['', null].includes(value),
  email: (value) => {
    const matcher = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    const MAX_LENGTH = 320

    if (value.length > MAX_LENGTH) { return false }
    return !matcher.test(value)
  }
}


const setError = (field) => {
  let error = ''
  switch (field) {
    case 'require':
      error = 'Обязательное поле'
      break
    case 'email':
      error = 'Невалидный e-mail'
      break
    default:
      break
  }
  return error
}

export const setBasicUiValidation = (form, schema) => {
  const MIN_ERRORS_COUNT = 0
  const TYPES = ['email', 'require']

  const config = {
    validateOnType: false,
    clearErrorsOnType: true }
  if (config.validateOnType) { config.clearErrorsOnType = false }
  if (config.clearErrorsOnType) { config.validateOnType = false }

  const hasErrors = ref(false)
  let isOnceValidated = false
  let errorsCount = 0
  let prevFormState = { ...form }

  const validation = () => {
    for (const prop in form) {
      for (const type of TYPES) {
        if (schema[prop][type]) {
          const error = REFINES[type](form[prop])
          if (error) {
            schema[prop].error = setError(type)
          } else {
            schema[prop].error = ''
          }

          if (error) {
            errorsCount++
          } else if (errorsCount > MIN_ERRORS_COUNT) {
            errorsCount--
          }

          hasErrors.value = errorsCount > MIN_ERRORS_COUNT
        }
      }
    }
  }

  const checkFormForChanges = (value) => {
    for (const prop in value) {
      const newValue = value[prop]
      const oldValue = prevFormState[prop]
      if (newValue !== oldValue) {
        if (config.clearErrorsOnType) {
          schema[prop].error = ''
        }
        if (config.validateOnType && isOnceValidated) {
          validation()
        }
      }
    }
  }

  watch(form, (value) => {
    checkFormForChanges(value)
    prevFormState = { ...value }
  })

  return { validate: validation, hasErrors }
}
