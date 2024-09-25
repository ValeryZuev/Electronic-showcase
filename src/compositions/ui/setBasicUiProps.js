import { computed } from 'vue'

const TYPES = {
  primary: 'primary',
  secondary: 'secondary',
  'green-rose': 'green-rose',
  'red-outline': 'red-outline'
}

const SIZES = {
  micro: 'micro',
  small: 'small',
  normal: 'normal',
  middle: 'middle',
  large: 'large'
}

const paramsAsJoinedString = (name, value) => {
  let string = ` ${name}`
  if (value) { string += `-${value}` }
  return string
}

export const setBasicUiProps = (props, componentClass) => {
  const classes = computed(() => {
    let classesAsString = componentClass || ''
    if (props.type && TYPES[props.type]) {
      classesAsString += paramsAsJoinedString('type', props.type)
    }
    if (props.size && SIZES[props.size]) {
      classesAsString += paramsAsJoinedString('size', props.size)
    }
    if (props.readonly) {
      classesAsString += paramsAsJoinedString('state-readonly')
    }
    if (props.disabled) {
      classesAsString += paramsAsJoinedString('state-disabled')
    }
    if (props.error) { classesAsString += paramsAsJoinedString('state-error') }
    if (props.classes) {
      classesAsString += paramsAsJoinedString(props.classes)
    }
    return classesAsString
  })

  return {
    classes
  }
}
