export const loadState = (name) => {
  const serializedState = localStorage.getItem(name)

  return serializedState ? JSON.parse(serializedState) : null
}

export const saveState = (name, state) => {
  const serializedState = JSON.stringify(state)

  localStorage.setItem(name, serializedState)
}

export const clearState = (name) => {
  localStorage.removeItem(name)
}
