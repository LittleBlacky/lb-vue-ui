export interface LbContainerProps {
  direction?: "horizontal" | "vertical";
}

export type LbContainerEmits = {
  (e: "example-event", value: string): void;
};
