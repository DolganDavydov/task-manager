<template>
  <v-bottom-sheet :model-value="value">
    <v-card>
      <div class="task-modal">
        <v-text-field
          :value="editTask.description"
          autofocus
          flat
          variant="solo"
          hide-details
          rounded="0"
          @input="onEditTaskInput"
          @keyup.enter="onEditTask"
        >
          <template #append-inner>
            <div class="icon" :class="{ disabled: !editTask.description }" @click="onEditTask">
              <v-icon size="small">mdi-send</v-icon>
            </div>
          </template>
        </v-text-field>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup>
import { useTasksStore } from '@/stores/tasks'

const tasks = useTasksStore()
const emit = defineEmits(['close', 'on-input'])

const props = defineProps({
  value: Boolean,
  editTask: Object
})

const onEditTask = () => {
  if (!props.editTask.description) return

  tasks.editTask(props.editTask)

  emit('close')
}

const onEditTaskInput = ({ target }) => {
  emit('on-input', target.value)
}
</script>
