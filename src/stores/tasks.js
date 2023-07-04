import { ref } from 'vue'
import { defineStore } from 'pinia'
import { loadState, saveState } from '@/helpers/persistedState'

export const useTasksStore = defineStore('tasks', () => {
  const tasksList = ref(loadState('tasksList') ?? [])
  const finishedTaskIds = ref(loadState('finishedTaskIds') ?? [])

  const addTask = (task) => {
    tasksList.value.push(task)
    saveState('tasksList', tasksList.value)
  }

  const removeTask = (id) => {
    tasksList.value = tasksList.value.filter((task) => task.id !== id)

    saveState('tasksList', tasksList.value)

    finishedTaskIds.value = finishedTaskIds.value.filter((taskId) => taskId !== id)

    saveState('finishedTaskIds', finishedTaskIds.value)
  }

  const editTask = (task) => {
    const foundTask = tasksList.value.find((taskItem) => taskItem.id === task.id)

    if (!foundTask) return

    foundTask.description = task.description

    saveState('tasksList', tasksList.value)
  }

  const setFinishedTaskId = (taskId) => {
    const foundFinishedTaskId = finishedTaskIds.value.includes(taskId)

    if (foundFinishedTaskId) {
      finishedTaskIds.value = finishedTaskIds.value.filter(
        (finishedTaskId) => finishedTaskId !== taskId
      )
    } else {
      finishedTaskIds.value.push(taskId)
    }

    saveState('finishedTaskIds', finishedTaskIds.value)
  }

  return { tasksList, addTask, removeTask, editTask, finishedTaskIds, setFinishedTaskId }
})
