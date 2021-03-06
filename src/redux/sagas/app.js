import { eventChannel } from "redux-saga";
import { take, put, call, fork } from "redux-saga/effects";
import { firebaseService } from "../../service/fireBase";
import { actionTypes, AppActions } from "../actions/app";

export function* appSaga() {
  while (true) {
    yield take(actionTypes.initFirebase);
    yield call(firebaseService.initFirebase);
    yield call(firebaseService.initCase, "amir123");
    yield fork(tenantsListenerSaga);
    yield fork(assetsListenerSaga);
  }
}

function* tenantsListenerSaga() {
  const chan = yield call(tenantsListener);
  try {
    while (true) {
      const msg = yield take(chan);
      yield put(AppActions.tenantsSnapshotRecieved(msg));
    }
  } finally {
    console.log("unsubscribed from tenants channel");
  }
}

function* assetsListenerSaga() {
  const chan = yield call(assetsListener);
  try {
    while (true) {
      const msg = yield take(chan);
      yield put(AppActions.assetsSnapshotRecieved(msg));
    }
  } finally {
    console.log("unsubscribed from assets channel");
  }
}

function tenantsListener() {
  return eventChannel(emitter => {
    const unsubscribe = firebaseService.listenForTenants(emitter);
    return () => unsubscribe();
  });
}

function assetsListener() {
  return eventChannel(emitter => {
    const unsubscribe = firebaseService.listenForAssets(emitter);
    return () => unsubscribe();
  });
}
