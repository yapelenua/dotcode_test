import { defineStore } from 'pinia'
import { useVueFlow } from '@vue-flow/core'
import { ref } from 'vue'
import type { INode } from '../../types/app.types'


export const UseDesktopStore = defineStore('desktopStore', () => {
  const { onNodeDrag, getNodes, updateNode } = useVueFlow()

  const nodes = ref<INode[]>([])

  const removedNodes = ref<INode[]>([])

  onNodeDrag(({ intersections, node }) => {
    const intersectionIds = intersections?.map((intersection) => intersection.id) || []

    for (const a of getNodes.value) {
      const isIntersecting = intersectionIds.includes(a.id)

      updateNode(a.id, { class: isIntersecting ? 'intersecting' : '' })
    }

    const localData: INode[] = JSON.parse(localStorage.getItem('nodes') || '[]')

    const result = localData.map((e) => {
      if (e.id === node.id) {
        return {
          ...e,
          position: {
            x: node.computedPosition.x,
            y: node.computedPosition.y
          },
        }
      }

      return e
    })

    localStorage.setItem('nodes', JSON.stringify(result))
  })

  function removeNode(id: string) {
    const index = nodes.value.findIndex((node) => node.id === id)
    if (index !== -1) {
      const [removedNode] = nodes.value.splice(index, 1)
      removedNodes.value.push(removedNode)
      updateLocalStorage()
    }
  }

  function undoRemove() {
    if (removedNodes.value.length > 0) {
      const [restoredNode] = removedNodes.value.splice(-1, 1)
      nodes.value.push(restoredNode)
      updateLocalStorage()
    }
  }

  function updateLocalStorage() {
    localStorage.setItem('nodes', JSON.stringify(nodes.value))
  }

  function toLocalStorage() {
    nodes.value = localStorage.getItem('nodes')?.length ? JSON.parse(localStorage.getItem('nodes') || '[]') : [
      {
        id: '1',
        type: 'resizable',
        label: 'Node1',
        position: { x: 100, y: 100 },
        style: { background: '#fff', border: '2px solid black', width: '300px', height: '100px' },
      },
      {
        id: '2',
        type: 'resizable',
        label: 'NodeResizerhhh',
        position: { x: 200, y: 200 },
        style: { background: '#fff', border: '2px solid black', width: '300px', height: '100px' },
      },
      {
        id: '3',
        type: 'resizable',
        label: 'NodeResizer',
        position: { x: 300, y: 300 },
        style: { background: '#fff', border: '2px solid black', width: '300px', height: '100px' },
      },
      {
        id: '4',
        type: 'resizable',
        label: 'NodeResizer',
        position: { x: 400, y: 400 },
        style: { background: '#fff', border: '2px solid black', width: '300px', height: '100px' },
      },
      {
        id: '5',
        type: 'resizable',
        label: 'NodeResizer',
        position: { x: 500, y: 500 },
        style: { background: '#fff', border: '2px solid black', width: '300px', height: '100px' },
      }
    ]

    localStorage.setItem('nodes', JSON.stringify(nodes.value))
  }

  return {
    removeNode,
    undoRemove,
    toLocalStorage,
    nodes,
    removedNodes,
  }
})
