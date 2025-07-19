<!-- <template>
  <div style="height: 800px">
    <div class="splitter" ref="splitter">
      <template v-for="index in count">
        <div
          class="panel"
          :style="{
            height: index & 1 ? '30px' : '20px',
          }"
        >
          {{ index }}
        </div>
        <div class="gutter" v-if="index < count" @mousedown="onMousedown($event, index)">
          <div class="gutter-inner" ref="gutterInner">哈</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
const splitter = ref()
const panel1 = ref()
const panel2 = ref()
let startPos: number[] = []
let startHeight: number[] = []
const children: Ref<Element[]> = ref([])
const gutter: Ref<Element[]> = ref([])
const count = ref(10)

onMounted(() => {
  children.value = document.querySelectorAll('.panel')
  gutter.value = document.querySelectorAll('.gutter');
  let total = 0
  children.value.forEach((child) => {
    total += child.offsetHeight
  })
  // const total = children.value.reduce((acc, cur) => acc + cur.offsetHeight, 0);
  children.value.forEach((child) => {
    child.style.flexBasis = `${(child.offsetHeight / total) * 100}%`
  })
})

const onMousemove = (e: MouseEvent) => {
  if (startPos.length) {
    const delta = e.clientY - startPos[1]
    const totalPanelHeight = startHeight[0] + startHeight[1]
    let newPanel1Height = startHeight[0] + delta
    const minPanelHeight = 0
    newPanel1Height = Math.max(
      minPanelHeight,
      Math.min(totalPanelHeight - minPanelHeight, newPanel1Height),
    )
    let newPanel2Height = totalPanelHeight - newPanel1Height
    const splitterHeight = splitter.value.offsetHeight - (children.value.length - 1) * 3
    panel1.value.style.flexBasis = `${(newPanel1Height / splitterHeight) * 100}%`
    panel2.value.style.flexBasis = `${(newPanel2Height / splitterHeight) * 100}%`
    if(panel1.value.style.flexBasis === '0%' || panel2.value.style.flexBasis === '0%') {
      gutter.value[index - 1].offsetHeight = '0px'
    }
  }
}

const onMouseup = (e: MouseEvent) => {
  startPos = []
  window.removeEventListener('mousemove', onMousemove)
  window.removeEventListener('mouseup', onMouseup)
}

const onMousedown = (e: MouseEvent, index: number) => {
  e.preventDefault()
  startPos = [e.clientX, e.clientY]
  let prev = children.value[index - 1] as HTMLElement
  let next = children.value[index] as HTMLElement
  if (prev.style.flexBasis === '0%' && index > 1) {
    --index
    prev = children.value[index - 1] as HTMLElement
    next = children.value[index] as HTMLElement
  } else if (next.style.flexBasis === '0%' && index < children.value.length - 1) {
    ++index
    prev = children.value[index - 1] as HTMLElement
    next = children.value[index] as HTMLElement
  }
  panel1.value = prev
  panel2.value = next
  startHeight = [prev.offsetHeight, next.offsetHeight]
  window.addEventListener('mousemove', onMousemove)
  window.addEventListener('mouseup', onMouseup)
}
</script>

<style scoped lang="scss">
.splitter {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #f0f2f5;
  .panel {
    width: 100%;
    min-height: 0%;
    max-height: 100%;
    overflow: auto;
  }
  .gutter {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--lb-color-info);
    height: 3px;
    min-height: 3px;
    max-height: 3px;
    width: 100%;
    cursor: row-resize;
  }
}
</style> -->

<template>
  <div style="width: 100%; height: 600px">
    <lb-splitter>
      <lb-splitter-panel><div style="width: 100px">1</div></lb-splitter-panel>
      <lb-splitter-panel>2</lb-splitter-panel>
      <lb-splitter-panel>
        <lb-splitter direction="vertical">
          <lb-splitter-panel>3</lb-splitter-panel>
          <lb-splitter-panel>4</lb-splitter-panel>
        </lb-splitter>
      </lb-splitter-panel>
    </lb-splitter>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}

.container {
  display: flex;
}
</style>
