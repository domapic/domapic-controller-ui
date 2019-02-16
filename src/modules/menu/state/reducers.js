import { HISTORY_PUSHED, HISTORY_POPPED } from "./actions";

export const NAMESPACE = "history";

const initialState = {
  position: 0
};

export const historyChanged = (state = initialState, action) => {
  switch (action.type) {
    case HISTORY_PUSHED:
      return { ...state, position: state.position + 1 };
    case HISTORY_POPPED:
      return { ...state, position: state.position - 1 };
    default:
      return state;
  }
};
