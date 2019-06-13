export const loadState = () => {
  // Need a try/catch block because localStorage.getItem() can fail if privacy
  // mode does not allow use of localStorage
  try {
    // 1. Pull state from localStorage object
    // 2. If the state is null, return undefined (to let the reducers intialize
    // the stat instead), otherwise return state
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = state => {
  try {
    // Need to stringify state because localStorage will only allow string values
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch {
    // ignore write errors
  }
}
