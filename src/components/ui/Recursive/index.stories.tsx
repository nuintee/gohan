import { ComponentMeta, ComponentStory } from '@storybook/react'
import Recursive from './index'

// data
import { details } from '@/data/details'

export default {
  title: 'UI/Recursive',
  component: Recursive,
} as ComponentMeta<typeof Recursive>

const Template: ComponentStory<typeof Recursive> = (args) => <Recursive {...args} />

export const Default = Template.bind({})

Default.args = {
  tree: details.result('ChIJBTBBRKiaqkARRgOZXBkrduI'),
}
