<template>
  <div class="wrapper">
    <div>
      <button v-if="removedNodes.length > 0" type="button" @click="undoRemove">Undo remove</button>
    </div>
    <div class="container">
      <VueFlow :nodes="nodes" fit-view-on-init>
        <template #node-resizable="resizableNodeProps">
          <ResizableNode :label="resizableNodeProps.label" :minHeight="100" :minWidth="300"/>
          <button type="button" @click="removeNode(resizableNodeProps.id)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Remove a node
          </button>
        </template>
      </VueFlow>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { VueFlow } from '@vue-flow/core'
import ResizableNode from '../components/ResizableNode.vue'
import { UseDesktopStore } from '../store/modules/desktop.store'
import { storeToRefs } from 'pinia'

const useDesktopStore = UseDesktopStore()
const {nodes, removedNodes} = storeToRefs(useDesktopStore)
const{removeNode, undoRemove, toLocalStorage,} = UseDesktopStore()

onMounted(() => {
  toLocalStorage()
})
</script>

<style scoped>
.container{
  width: 1200px;
  height: 800px;
  border: solid rgb(0, 200, 255);
}
.wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>