import { State } from "./state";

function updateToken(state: State) {
  return (token: string) => {
    state.token = token;
  };
}

function updateCode(state: State) {
  return (code: any) => {
    state.code = code;
    console.log(code);
  };
}

function updateUser(state: State) {
  return (user: any) => {
    state.user = user;
  };
}

/**
 * 创建Action
 * @param state
 */
export function createAction(state: State) {
  return {
    updateToken: updateToken(state),
    updateCode: updateCode(state),
    updateUser: updateUser(state)
  };
}
