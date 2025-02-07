<template>
  <div class="page">
    <BaseTable
      v-model:selected="selected"
      :options="{
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true,
          onlyCurrent: false,
        },
      }"
      :data="items"
      :operates="operates"
      :columns="columns"
    />
  </div>
</template>
<script setup lang="tsx">
import { FileUtils } from '@/utils'
import { useImage } from './useImage'
import { BaseTable } from '@/components'
import { computed } from 'vue'
import Profile from './profile.vue'

const { selected, items, onAddItem, onRemoveItems, onConvertItems } = useImage()

const operates = computed(() => [
  {
    text: '导入图片',
    type: 'primary',
    onClick: () => onAddItem(),
  },
  {
    text: '批量删除',
    type: 'primary',
    // disabled: selected.value.length <= 0,
    onClick: () => onRemoveItems(selected.value),
  },
  {
    text: '开始转化',
    type: 'primary',
    // disabled: images.length <= 0,
    onClick: () => onConvertItems(),
  },
])

const columns = [
  {
    title: '基础信息',
    dataIndex: 'name',
    width: 400,
    render: ({ record }: any) => <Profile data={record} />,
  },
  {
    title: '图片分辨率',
    dataIndex: 'dpi',
    align: 'center',
    render: ({ record }: any) => `${record.dpi.width} * ${record.dpi.height}`,
  },
  {
    title: '图片类型',
    dataIndex: 'type',
    align: 'center',
  },
  {
    title: '最后编辑时间',
    dataIndex: 'lastModified',
    align: 'center',
  },
]
</script>
<style lang="scss" scoped>
.page {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: var(--color-bg-1);
  border: 1px solid var(--color-border);
  .page-title {
    font-size: 16px;
    font-weight: bold;
    color: var(--color-neutral-8);
  }
}
</style>
