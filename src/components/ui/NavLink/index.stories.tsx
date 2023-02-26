import { ComponentMeta, ComponentStory } from '@storybook/react'
import NavLink from './index'

export default {
  title: 'UI/NavLink',
  component: NavLink,
} as ComponentMeta<typeof NavLink>

const Template: ComponentStory<typeof NavLink> = (args) => <NavLink {...args} />

export const Default = Template.bind({})

Default.args = {
  href: '/',
  label: 'NI',
}

Default.parameters = {
  backgrounds: { default: 'dark' },
}
