<template>
  <div class="base-video-preview" v-if="visible" @click="onClose">
    <div class="preview-close-btn" @click="onClose">
      <IconClose />
    </div>
    <video
      class="preview-player"
      :src="url"
      controls
      autoplay
      loop
      @click.stop="() => {}"
    ></video>
  </div>
</template>
<script setup lang="ts">
import { IconClose } from '@arco-design/web-vue/es/icon'
import { ref } from 'vue'

interface PropsType {
  url: string
}
const props = defineProps<PropsType>()

const visible = ref(true)

const onClose = () => {
  visible.value = false
}
</script>
<style lang="scss" scoped>
.base-video-preview {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-mask-bg);
  .preview-close-btn {
    position: absolute;
    top: 36px;
    right: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 14px;
    line-height: 32px;
    color: var(--color-white);
    text-align: center;
    cursor: pointer;
    background: rgba(0, 0, 0, 50%);
    border-radius: 50%;
  }
  .preview-player {
    width: 50%;

    // height: 300px;
  }
}
</style>
