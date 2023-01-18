import { ComponentMeta, ComponentStory } from '@storybook/react'
import MapBox from '..'

export default {
  title: 'MapBox',
  component: MapBox,
} as ComponentMeta<typeof MapBox>

const MapBoxTemplate: ComponentStory<typeof MapBox> = (args) => <MapBox {...args} />

export const Default = MapBoxTemplate.bind({})

Default.args = {
  type: 'text',
}
