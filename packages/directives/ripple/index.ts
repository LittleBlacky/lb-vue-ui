import Ripple from "./src/ripple";

export * from "./src/types";

export { Ripple };

declare module "vue" {
  export interface GlobalDirectives {
    ripple: typeof Ripple;
  }
}
