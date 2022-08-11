import { configureStore, ThunkAction, Action, Dispatch, AsyncThunk, AsyncThunkOptions, AsyncThunkPayloadCreator } from '@reduxjs/toolkit'
import counterReducer from 'features/counter/counterSlice'
import preferenceReducer from 'features/switchTheme/themeSlice'
import repoReducer from 'features/repository/repositorySlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: preferenceReducer,
    repo: repoReducer
  }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

declare module '@reduxjs/toolkit' {
  type AsyncThunkConfig = {
    state?: unknown;
    dispatch?: Dispatch;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
pendingMeta?: unknown;
fulfilledMeta?: unknown;
rejectedMeta?: unknown;
  };

  // eslint-disable-next-line no-unused-vars
  function createAsyncThunk<
    Returned,
    ThunkArg = void,
    ThunkApiConfig extends AsyncThunkConfig = {
      state: RootState; // this line makes a difference
    }
  >(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<
      Returned,
      ThunkArg,
      ThunkApiConfig
    >,
    options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>
  ): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
}
