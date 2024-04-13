<script setup>
import { Handle, Position } from '@vue-flow/core'
import { NodeResizer } from '@vue-flow/node-resizer'
import { defineProps } from 'vue'

const props = defineProps(['label','minHeight','minWidth'])
</script>

<template>
  <NodeResizer :min-width="minWidth" :min-height="minHeight"/>

  <Handle type="target" :position="Position.Left" />
  <div style="padding: 10px">{{ props.label }}</div>
  <Handle type="source" :position="Position.Right" />
</template>

