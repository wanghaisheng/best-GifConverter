<template>
  <div class="base-gif-preview">
    <div class="preview-tips" v-show="code === 'Ongoing'">
      {{ percent }}
    </div>
    <!-- progress:{{ data.progress }}

    result: {{ data.result }} loading: {{ data.loading }} -->

    <Image
      class="preview-image"
      width="100%"
      :height="250"
      fit="contain"
      :src="result"
    />
  </div>
</template>
<script setup lang="ts">
import { Image } from '@arco-design/web-vue'

interface PropsType {
  code: string
  result: string
  percent: string
}
const props = defineProps<PropsType>()
</script>
<style lang="scss" scoped>
.base-gif-preview {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-neutral-1);
  .preview-tips {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-family: Furore;
    font-size: 20px;
    color: var(--color-fill-4);
    background-color: var(--color-neutral-1);
  }
  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border: unset;
  }
}
</style>
