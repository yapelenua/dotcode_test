<template>
  <div id="app" class="font-sans text-gray-900">
    <h2 class="text-2xl font-bold mb-4 mt-4">BitTable</h2>
    <h2 class="text-xl mb-4">{{ totalAmount }}</h2>
    <div class="flex justify-center space-x-4 mb-4">
      <button @click="sendMessage('{ \'op\': \'unconfirmed_sub\' }')" class="btn-start">Запуск</button>
      <button @click="sendMessage('{ \'op\': \'unconfirmed_unsub\' }')" class="btn-stop">Зупинка</button>
      <button @click="reset" class="btn-reset">Скидання</button>
    </div>
    <div class="table-wrapper overflow-y-auto max-h-[600px]">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="border py-2 px-4">Відправник</th>
            <th class="border py-2 px-4">Отримувач</th>
            <th class="border py-2 px-4">Сума</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.hash" class="border-b">
            <td class="border py-2 px-4">{{ transaction.x.inputs[0].prev_out.addr }}</td>
            <td class="border py-2 px-4">{{ transaction.x.out[0].addr }}</td>
            <td class="border py-2 px-4">{{ transaction.x.out[0].value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UseBittableStore } from '../store/modules/bittable.store'
import { storeToRefs } from 'pinia'

const useBittableStore = UseBittableStore()
const { transactions, totalAmount } = storeToRefs(useBittableStore)
const { sendMessage, reset } = UseBittableStore()
</script>

<style scoped>
.btn-start {
  @apply bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600;
}

.btn-stop {
  @apply bg-red-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-red-600;
}

.btn-reset {
  @apply bg-gray-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-gray-600;
}

</style>
