import { AsyncThunkAction } from "@reduxjs/toolkit";
import axios, { AxiosStatic } from "axios";

import { StateSchema } from "app/providers/StoreProvider";

type ActionCreatorType<Returned, Arg, RejectValue> = (arg: Arg) => AsyncThunkAction<Returned, Arg, { rejectValue: RejectValue }>;

jest.mock("axios");
const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Returned, Arg, RejectValue> {
  dispatch: jest.MockedFn<any>;
  getState: () => StateSchema;
  actionCreator: ActionCreatorType<Returned, Arg, RejectValue>;

  api: jest.MockedFunctionDeep<AxiosStatic>;
  navigate: jest.MockedFn<any>;

  constructor(actionCreator: ActionCreatorType<Returned, Arg, RejectValue>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();
    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, { api: this.api, navigate: this.navigate });

    return result;
  }
}
