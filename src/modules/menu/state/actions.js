export const HISTORY_PUSHED = "HISTORY_PUSHED";
export const HISTORY_POPPED = "HISTORY_POPPED";

export const historyPushed = () => ({ type: HISTORY_PUSHED });

export const historyPopped = () => ({ type: HISTORY_POPPED });
