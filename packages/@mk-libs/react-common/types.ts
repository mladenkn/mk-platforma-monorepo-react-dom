import { ComponentProps, JSXElementConstructor } from "react"
import { Required } from "utility-types"

export type OverridableProps<
  TComponent extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  TRequiredProps extends keyof ComponentProps<TComponent>
> = Required<Partial<ComponentProps<TComponent>>, TRequiredProps>
