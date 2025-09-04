import { getCurrentInstance } from "vue";

export const useErrorInstance = (message: string) => {
  const instance = getCurrentInstance();
  if (instance) {
    throw new Error(`${instance}: ${message}`);
  }
};
