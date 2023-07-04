<template>
  <v-bottom-sheet :model-value="value">
    <v-card>
      <div class="task-modal">
        <v-text-field
          v-model="taskDescription"
          autofocus
          flat
          variant="solo"
          hide-details
          rounded="0"
          @keyup.enter="onCreateTask"
        >
          <template #append-inner>
            <div class="icon" :class="{ disabled: !taskDescription }" @click="onCreateTask">
              <v-icon size="small">mdi-send</v-icon>
            </div>
          </template>
        </v-text-field>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script setup>
import { ref, unref } from 'vue'
import { uniqueId } from '@/helpers/uniqueId'
import { useTasksStore } from '@/stores/tasks'

const tasks = useTasksStore()

const emit = defineEmits(['close'])

defineProps({
  value: Boolean
})

const taskDescription = ref('')

const closeModal = () => {
  emit('close')
}

const onCreateTask = () => {
  if (!taskDescription.value) return

  tasks.addTask({
    id: uniqueId(),
    description: unref(taskDescription)
  })

  taskDescription.value = ''

  closeModal()
}
</script>
