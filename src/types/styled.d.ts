import "styled-components";
import type { Theme } from "../styled/Theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
