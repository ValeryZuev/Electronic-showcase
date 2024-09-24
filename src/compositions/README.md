### Compositions

Vue 3 композиции.
Обязательно размещаем по категориям, в ROOT только папки.
Если композиция не попадает не в одну из категорий - выносим на обсуждение создание новой папки.

#### Пример композиции

```javascript
export const setBasicUiDataBindings = (emit) => {

  const change = (e) => {
    if (e.target && e.target.value) {
      const { value } = e.target
      emit('input', value)
      emit('change', value)
    }
  }

  return {
    change
  }
}
```