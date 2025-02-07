<template>
  <div class="image-info">
    <video
      fit="cover"
      :src="data.url"
      :width="50"
      :height="34"
      @click="onPreview"
    />
    <div class="info-base">
      <div class="info-name">{{ data.name }}</div>
      <div class="info-size">{{ data.size }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { itemType } from './useCamera'
import { createBaseVideoPreviewModal } from '@/components'
interface PropsType {
  data: itemType
}
const props = defineProps<PropsType>()
const onPreview = () => {
  createBaseVideoPreviewModal(props.data.url)
}
</script>
<style lang="scss" scoped>
.image-info {
  display: flex;
  align-items: center;
  .info-base {
    margin-left: 8px;
    .info-name {
      width: 300px;
      overflow: hidden;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info-size {
      font-size: 12px;
      color: var(--color-neutral-6);
    }
  }
}
</style>
