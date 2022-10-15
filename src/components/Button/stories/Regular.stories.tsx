import { ComponentMeta, ComponentStory } from '@storybook/react'
import Regular from '../Regular/index'

export default {
  title: 'Regular',
  component: Regular,
} as ComponentMeta<typeof Regular>

const Template: ComponentStory<typeof Regular> = (args) => <Regular {...args} />

export const Default = Template.bind({})

Default.args = {
  text: '',
  loading: true,
  onClick: () => {
    console.log(1)
  },
}
