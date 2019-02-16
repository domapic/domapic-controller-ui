import { connect } from "react-redux";

import { Component as HomeMenuComponent } from "src/components/menu-home";

import { NAMESPACE } from "../state/reducers";
import { historyPushed, historyPopped } from "../state/actions";

let config;

const historyListener = (location, action) => {
  switch (action) {
    case "POP":
      config.store.dispatch(historyPopped());
      break;
    case "PUSH":
      config.store.dispatch(historyPushed());
      break;
  }
};

const historyBack = () => {
  config.history.goBack();
};

export const init = configuration => {
  config = configuration;
  config.history.listen(historyListener);
};

export const mapStateToProps = state => {
  return {
    historyPosition: state[NAMESPACE].position,
    historyBack
  };
};

export const HomeMenu = connect(mapStateToProps)(HomeMenuComponent);
