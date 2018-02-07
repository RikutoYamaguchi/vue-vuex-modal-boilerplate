import _ from 'lodash';

import {
  PUSH,
  REPLACE,
  CLOSE,
  ADD_INDEX,
  CHANGE_INDEX,
  APPLY_TRANSITION,
  INIT_DEFERRED
} from "./types";

import TRANSITION_NAMES from './transition_names'

let promiseStore = null;

const createDeferred = (commit) => {
  // create deferred
  let _resolve = null;
  let _reject = null;
  promiseStore = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });
  commit(INIT_DEFERRED, {
    resolve: _resolve,
    reject: _reject
  });
};

const execCallbacks = (callbacks, params) => {
  _.each(callbacks, callback => {
    if (_.isFunction(callback)) {
      callback(params.err, params.data)
    }
  });
};

export default {
  push({ commit, getters, dispatch }, { name, params, callback = null, dfd }) {
    // save before modalNames length
    const { modalLength, deferred, modalNames, currentIndex } = getters;

    // decide transition name
    if (modalLength > 0) {
      commit(APPLY_TRANSITION, { transitionName: TRANSITION_NAMES.forward });
    } else {
      commit(APPLY_TRANSITION, { transitionName: TRANSITION_NAMES.default });
    }

    const nextIndex = modalLength === 0 ? 0 : currentIndex + 1;

    if (modalNames[nextIndex]) {
      // already modal exist
      commit(REPLACE, { name, params, callback, index: nextIndex });
    } else {
      // push modal
      commit(PUSH, { name, params, callback });
    }

    _.delay(() => commit(CHANGE_INDEX, nextIndex), 1);

    if (deferred === null) {
      createDeferred(commit);
    }

    if (dfd) {
      return promiseStore;
    }
  },

  replace({ commit, getters }, { name, params, callback = null, dfd }) {
    const { currentIndex, deferred } = getters;
    commit(APPLY_TRANSITION, { transitionName: TRANSITION_NAMES.none });
    commit(REPLACE, { name, params, callback, index: currentIndex });

    if (deferred === null) {
      createDeferred(commit);
    }

    if (dfd) {
      return promiseStore;
    }
  },

  close({ commit }) {
    commit(APPLY_TRANSITION, { transitionName: TRANSITION_NAMES.default });
    promiseStore = null;
    _.delay(() => commit(CLOSE), 1);
  },

  reject({ dispatch, getters }, err = null) {
    const { callbacks, deferred } = getters;
    execCallbacks(callbacks, { err, data: null });
    if (deferred !== null) {
      deferred.reject(err);
    }
    dispatch('close');
  },

  resolve({ dispatch, getters }, data) {
    const { callbacks, deferred } = getters;
    execCallbacks(callbacks, { err: null, data });
    if (deferred !== null) {
      deferred.resolve(data);
    }
    dispatch('close');
  },

  go({ commit, getters }, n) {
    const { modalLength, currentIndex } = getters;
    const nextIndex = currentIndex + n;

    if (nextIndex < 0 || modalLength - 1 < nextIndex) {
      console.warn('There is no target modal. ');
      return false;
    }

    if (n > 0) {
      commit(APPLY_TRANSITION, { transitionName: TRANSITION_NAMES.forward });
    } else {
      commit(APPLY_TRANSITION, { transitionName: TRANSITION_NAMES.backward });
    }
    _.delay(() => commit(ADD_INDEX, n), 1);
  },

  forward({ commit, getters }) {

    const { modalLength, currentIndex } = getters;
    const nextIndex = currentIndex + 1;

    if (nextIndex > modalLength - 1) {
      console.warn('There is no target modal. ');
      return false;
    }

    commit(APPLY_TRANSITION, { transitionName: TRANSITION_NAMES.forward });
    _.delay(() => commit(CHANGE_INDEX, nextIndex), 1);
  },

  back({ commit, getters }) {
    const { currentIndex } = getters;
    const nextIndex = currentIndex - 1;

    if (nextIndex < 0) {
      console.warn('There is no target modal. ');
      return false;
    }

    commit(APPLY_TRANSITION, { transitionName: 'backward' });
    _.delay(() => commit(CHANGE_INDEX, nextIndex), 1);
  }
};