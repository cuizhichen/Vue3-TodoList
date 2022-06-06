import { createAction } from "./action";
import { createState } from "./state";

const state = createState();
const action = createAction(state);

export const useStore = () => {
  const store = {
    state: state,
    action: action
  };

  return store;
};
