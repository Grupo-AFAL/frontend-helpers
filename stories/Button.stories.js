// import { createButton } from './Button';
import '../javascript/docs/index.scss'

export default {
  title: 'Example/Button',
  argTypes: {
    label: { control: 'text' }
  }
}

export const Primary = ({ label, ...args }) =>
  `<button class="button is-primary">${label}</button>`

Primary.args = {
  label: 'Button'
}

export const Secondary = ({ label, ...args }) =>
  `<button class="button">${label}</button>`

Secondary.args = {
  label: 'Button'
}

export const Large = ({ label, ...args }) => {
  return `<button class="button is-large">${label}</button>`
}
Large.args = {
  label: 'Button'
}

export const Small = ({ label, ...args }) => {
  return `<button class="button is-small">${label}</button>`
}
Small.args = {
  label: 'Button'
}
