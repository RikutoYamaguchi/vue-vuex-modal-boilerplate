import _ from 'lodash'

import {
  PUSH,
  CLOSE,
  ADD_INDEX,
  CHANGE_INDEX,
  APPLY_TRANSITION,
  INIT_DEFERRED,
  SAVE_CALLBACK
} from './types'

import actions from './actions'

const state = {
  modalNames: [],
  modalParams: [],
  currentIndex: 0,
  transitionName: 'scale',
  callback: null,
  deferred: null
};

const mutations = {
  [PUSH] (state, { name, params = null }) {
    state.modalNames.push(name);
    state.modalParams.push(params);
  },
  [CLOSE] (state) {
    state.callback = null;
    state.deferred = null;
    state.modalNames = [];
    state.currentIndex = 0;
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