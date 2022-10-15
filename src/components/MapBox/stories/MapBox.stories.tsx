import { ComponentMeta, ComponentStory } from '@storybook/react'
import MapBox from '..'

export default {
  title: 'Mapbox',
  component: MapBox,
} as ComponentMeta<typeof MapBox>

const Template: ComponentStory<typeof MapBox> = (args) => <MapBox {...args} />

export const Default = Template.bind({})
