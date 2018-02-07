import _ from 'lodash'

import {
  PUSH,
  REPLACE,
  CLOSE,
  ADD_INDEX,
  CHANGE_INDEX,
  APPLY_TRANSITION,
  INIT_DEFERRED,
  SAVE_CALLBACK
} from './types'

import TRANSITION_NAMES from './transition_names'
import actions from './actions'

const state = {
  modalNames: [],
  modalParams: [],
  currentIndex: 0,
  transitionName: TRANSITION_NAMES.default,
  callback: null,
  deferred: null
};

const mutations = {
  [PUSH] (state, { name, params = null }) {
    state.modalNames.push(name);
    state.modalParams.push(params);
  },
  [REPLACE] (state, { name, params = null, index }) {
    state.modalNames[index] = name;
    state.modalParams[index] = params;
    state.modalNames.splice(index + 1, state.modalNames.length - 1);
    state.modalParams.splice(index + 1, state.modalParams.length - 1);
  },
  [CLOSE] (state) {
    state.modalNames = [];
    state.modalParams = [];
    state.transitionName = TRANSITION_NAMES.default;
    state.currentIndex = 0;
    state.callback = null;
    state.deferred = null;
  },
  [ADD_INDEX] (state, n) {
    state.currentIndex += n;
  },
  [CHANGE_INDEX] (state, n) {
    state.currentIndex = n;
  },
  [APPLY_TRANSITION] (state, { transitionName }) {
    state.transitionName = transitionName
  },
  [INIT_DEFERRED] (state, { resolve, reject }) {
    state.deferred = { resolve, reject };
  },
  [SAVE_CALLBACK] (state, cb) {
    state.callback = cb;
  }
};

const getters = {
  modalNames: state => state.modalNames,
  currentIndex: state => state.currentIndex,
  currentModalName: state => state.modalNames[state.currentIndex] || null,
  currentModalParams: state => state.modalParams[state.currentIndex] || null,
  modalLength: state => state.modalNames.length,
  isShow: (state, getters) => !_.isEmpty(getters.currentModalName),
  transitionName: state => state.transitionName,
  deferred: state => state.deferred,
  callback: state => state.callback,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
