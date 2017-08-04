import {createSelector} from 'reselect'

export const usersSelector = (state) => state.users.usersById

export const userByIdSelector = createSelector(
  [usersSelector, (state, userId) => userId],
  (users, userId) => users[userId]
)
