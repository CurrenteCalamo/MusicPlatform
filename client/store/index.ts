import { Context, createWrapper, MakeStore } from 'next-redux-wrapper'
import { applyMiddleware, createStore } from 'redux'
import { reducer, RootState } from './reducers'
import thunk from 'redux-thunk'

const makeStore: MakeStore<RootState> = (context: Context) =>
  createStore(reducer, applyMiddleware(thunk))

export const wrapper = createWrapper<RootState>(makeStore, { debug: true })
