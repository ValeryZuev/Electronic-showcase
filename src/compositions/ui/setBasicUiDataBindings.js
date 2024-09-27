export const setBasicUiDataBindings = (emit) => {
  const MIN_ARRAY_LENGTH = 0

  const change = (e) => {
    if (e.target) {
      const { value, checked, type } = e.target

      let model = ['text', 'number', 'range', 'textarea', 'password']
        .includes(type) ? value : value || 'undefined'
      if (checked !== 'undefined' && type === 'checkbox') {
        model = checked
      }
      if (type === 'number') {
        model = Number(model)
      }
      emit('update:modelValue', model)
      emit('change', model)

      return value
    }
    if (['string', 'number', 'boolean'].includes(typeof e)
        || Object.prototype.hasOwnProperty.call(e, 'value')
        || Array.isArray(e)) {
      emit('update:modelValue', e)
      emit('change', e)
      return e
    }
    if (e.length >= MIN_ARRAY_LENGTH) {
      emit('update:modelValue', e)
      emit('change', e)
      return e
    }
    return e
  }

  return { change }
}
