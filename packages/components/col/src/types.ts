export interface LbColProps {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
  xs?:
    | number
    | { span?: number; offset?: number; pull?: number; push?: number };
  sm?:
    | number
    | { span?: number; offset?: number; pull?: number; push?: number };
  md?:
    | number
    | { span?: number; offset?: number; pull?: number; push?: number };
  lg?:
    | number
    | { span?: number; offset?: number; pull?: number; push?: number };
  xl?:
    | number
    | { span?: number; offset?: number; pull?: number; push?: number };
}

export type LbColEmits = {};
