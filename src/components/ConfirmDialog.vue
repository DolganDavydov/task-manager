<template>
  <v-dialog :value="value" width="auto">
    <v-card>
      <v-card-text>
        <div class="py-4">Вы действительно хотите удалить задачу?</div>
      </v-card-text>

      <v-card-actions>
        <div class="d-flex justify-space-between w-100 px-2 py-4">
          <v-btn color="grey" @click="onCloseDialog">Отмена</v-btn>
          <v-btn color="red" @click="onRemoveTask">Да</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
defineProps({
  value: Boolean
})

const emit = defineEmits(['close', 'remove'])

const onCloseDialog = () => {
  emit('close')
}

const onRemoveTask = () => {
  emit('remove')
}
</script>
