import { createVNode, render } from 'vue'
import BaseVideoPreview from './BaseVideoPreview.vue'

// export { default as BaseVideoPreview } from './BaseVideoPreview.vue'

export function createBaseVideoPreviewModal(url: string) {
  return new Promise((resolve) => {
    const instance = createVNode(BaseVideoPreview, { resolve, url })
    const template = document.createElement('div')
    render(instance, template)
    const vnode = instance.el as HTMLElement
    document.body.appendChild(vnode)
  })
}
