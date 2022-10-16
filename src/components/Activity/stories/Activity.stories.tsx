import { ComponentMeta, ComponentStory } from '@storybook/react'
import Acitvity from '..'

export default {
  title: 'Acitvity',
  component: Acitvity,
} as ComponentMeta<typeof Acitvity>

const Template: ComponentStory<typeof Acitvity> = (args) => <Acitvity {...args} />

export const Default = Template.bind({})

Default.args = {
  locked: false,
  onClick: () => {},
}
