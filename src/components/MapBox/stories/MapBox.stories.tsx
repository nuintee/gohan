import { type ComponentMeta, type ComponentStoryObj } from "@storybook/react"
import { MapBox } from "."

type T = typeof MapBox
type Meta = ComponentMeta<T>;
type Story = ComponentStoryObj<T>;

export default {
  component: MapBox,
    args: {},
  } as Meta


export const Default: Story = {}

