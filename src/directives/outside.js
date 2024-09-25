export default {
  beforeMount (el, binding) {
    const handler = (e) => {
      if (!el.contains(e.target) && el !== e.target) {
        binding.value(e)
      }
    }
    if (typeof binding.value === 'function') {
      el.__vueOutside__ = handler
      document.addEventListener('click', el.__vueOutside__, { capture: true })
    }
  },
  beforeUnmount (el) {
    document.removeEventListener('click', el.__vueOutside__, { capture: true })
    el.__vueOutside__ = null
  }
}
