import {Action} from "redux";
import {call, CallEffect, put, PutEffect} from "redux-saga/effects";
import {IPromiseActions} from "../helpers/promiseReducer";

// tslint:disable:max-line-length
export default function* makeRequest(requestType: IPromiseActions, apiMethod: (payload: any) => Promise<any>, ...args: any[]): IterableIterator<PutEffect<Action> | CallEffect> {
  yield put({type: requestType.PENDING});
  const [arg0, arg1, arg2, arg3, arg4, arg5, ...rest] = args; // we do this because of redux saga typing limitation
  const payload = yield call(apiMethod, arg0, arg1, arg2, arg3, arg4, arg5, ...rest);
  if (payload.error) {
    yield put({type: requestType.REJECTED, message: payload.error});
  } else {
    yield put({type: requestType.FULFILLED, payload});
  }
}
