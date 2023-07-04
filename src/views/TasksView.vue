<template>
  <div class="tasks">
    <v-app-bar color="rgba(1, 1, 1, 0.5)" flat>
      <v-app-bar-title>
        <router-link to="/">
          <div class="text-subtitle-1 text-uppercase py-2">
            <span class="underline small">Go Back</span>
          </div>
        </router-link>
      </v-app-bar-title>

      <v-spacer />

      <v-btn v-if="tasksList.length" icon @click="openCreateTaskModal">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>

    <div v-if="tasksList.length" class="pa-4">
      <v-card
        v-for="task in tasksList"
        :key="task.id"
        class="d-flex justify-space-between align-center pt-1 pb-10 mb-5"
      >
        <template v-slot:image>
          <v-img gradient="to top right, rgba(128,208,199,.8), rgba(159,146,227,1) 50%"></v-img>
        </template>
        <v-checkbox
          :model-value="isFinishedTaskId(task.id)"
          class="py-2"
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

        <div class="actions px-4">
          <v-btn
            v-if="!isFinishedTaskId(task.id)"
            size="x-small"
            icon=""
            color="rgba(1, 1, 1, 0.1)"
            @click="onSetEditTask(task)"
          >
            <v-icon icon="mdi-pencil" color="grey-lighten-1" />
          </v-btn>
          <v-icon v-else icon="mdi-thumb-up" color="yellow" />
          <v-btn
            class="ml-auto"
            size="x-small"
            icon=""
            color="rgba(1, 1, 1, 0.1)"
            @click="onSetRemoveTask(task.id)"
          >
            <v-icon icon="mdi-trash-can-outline" color="pink-accent-3" />
          </v-btn>
        </div>
      </v-card>
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

  .actions {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    display: flex;
  }
}
</style>
