<template>
  <div class="tasks">
    <v-app-bar color="rgb(0 0 0 / 0)" flat>
      <v-app-bar-title>
        <router-link to="/">
          <div class="text-subtitle-1 text-uppercase py-2">
            <span class="underline small">Go Back</span>
          </div>
        </router-link>
      </v-app-bar-title>

      <v-spacer />

      <v-btn icon @click="openCreateTaskModal">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <div v-if="tasksList.length" class="pa-4">
      <div
        v-for="task in tasksList"
        :key="task.id"
        class="d-flex justify-space-between align-center py-1"
      >
        <v-checkbox
          :model-value="isFinishedTaskId(task.id)"
          color="success"
          hide-details
          density="compact"
          @click="onSetFinishedTaskId(task.id)"
        >
          <template #label>
            <span :class="{ 'text-decoration-line-through': isFinishedTaskId(task.id) }">
              {{ task.description }}
            </span>
          </template>
        </v-checkbox>

        <div class="actions">
          <v-btn
            v-if="!isFinishedTaskId(task.id)"
            size="x-small"
            icon="mdi-pencil"
            @click="onSetEditTask(task)"
          />
          <v-btn size="x-small" icon="mdi-delete" class="ml-2" @click="onSetRemoveTask(task.id)" />
        </div>
      </div>
    </div>

    <div v-else class="tasks-empty text-center">
      <div class="text-subtitle-1 mb-4">Создать задачу</div>
      <v-btn icon="mdi-plus" size="small" @click="openCreateTaskModal" />
    </div>

    <CreateTaskModal v-model="createTaskModalIsOpen" @close="closeCreateTaskModal" />

    <EditTaskModal
      v-model="editTaskModalIsOpen"
      :editTask="editTask"
      @on-input="onEditTaskInput"
      @close="closeEditTaskModal"
    />

    <ConfirmDialog
      v-model="confirmDialogIsOpen"
      @remove="onRemoveTask"
      @close="closeConfirmDialog"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import CreateTaskModal from '@/components/СreateTaskModal.vue'

import EditTaskModal from '@/components/EditTaskModal.vue'

import ConfirmDialog from '@/components/ConfirmDialog.vue'

import { useTasksStore } from '@/stores/tasks'

const tasks = useTasksStore()

const createTaskModalIsOpen = ref(false)

const editTaskModalIsOpen = ref(false)

const confirmDialogIsOpen = ref(false)

const editTask = ref(null)

const removeTaskId = ref(null)

const openCreateTaskModal = () => {
  createTaskModalIsOpen.value = true
}

const closeCreateTaskModal = () => {
  createTaskModalIsOpen.value = false
}

const tasksList = computed(() => {
  return tasks.tasksList
})

const isFinishedTaskId = (taskId) => {
  return tasks.finishedTaskIds.includes(taskId)
}

const onSetFinishedTaskId = (taskId) => {
  tasks.setFinishedTaskId(taskId)
}

const onSetEditTask = (task) => {
  editTask.value = { ...task }
  openEditTaskModal()
}

const onEditTaskInput = (value) => {
  editTask.value.description = value
}

const openEditTaskModal = () => {
  editTaskModalIsOpen.value = true
}

const closeEditTaskModal = () => {
  editTaskModalIsOpen.value = false
}

const onSetRemoveTask = (id) => {
  removeTaskId.value = id
  openConfirmDialog()
}

const onRemoveTask = () => {
  tasks.removeTask(removeTaskId.value)
  closeConfirmDialog()
}

const openConfirmDialog = () => {
  confirmDialogIsOpen.value = true
}

const closeConfirmDialog = () => {
  confirmDialogIsOpen.value = false
}
</script>

<style lang="scss" scoped>
.tasks {
  padding-top: 64px;

  &-empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
