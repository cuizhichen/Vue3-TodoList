import { reactive } from "vue";

export interface State {
  code: string;
  token: string;
  user: Record<string, unknown>;
}

export const State: State = {
  code: "",
  token: "token",
  user: {}
};

export function createState() {
  return reactive(State);
}
