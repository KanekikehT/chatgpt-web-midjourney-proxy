<script lang="ts" setup>
import { ref, watch } from 'vue'
import { NDrawer, NDrawerContent } from 'naive-ui'
import { homeStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'

const { isMobile } = useBasicLayout()
const st = ref({ show: false })

// 监听活动状态，对应于公告弹窗
watch(() => homeStore.myData.act, (act) => {
  if (act === 'announcement')
    st.value.show = true
})

function closeDrawer() {
  st.value.show = false
}
</script>

<template>
  <NDrawer
    v-model:show="st.show" :placement="isMobile ? 'bottom' : 'right'"
    :class="isMobile ? ['!h-[90vh]'] : ['!w-[50vw]']" style="--n-body-padding:0"
  >
    <NDrawerContent title="文无便利店公告" closable @close="closeDrawer">
      <div class="p-4 space-y-4">
        <section>
          <h2 class="text-xl font-bold text-gray-800">
            欢迎来到文无便利店
          </h2>
          <p class="text-sm text-gray-600">
            我们是由文无科技研发，集成了最先进的自然语言处理技术的大型AI模型平台。我们的服务不仅包括多语言处理，还能处理多种媒体形式的内容，具备卓越的跨领域知识和语言理解能力。无论您需要语言翻译、文本摘要、情感分析还是语义理解，文无便利店都能提供专业的帮助。
          </p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-800">
            主要功能介绍
          </h2>
          <ul class="list-disc pl-5 text-sm text-gray-600">
            <li>语言理解与文案创作</li>
            <li>输出报告与演讲稿</li>
            <li>专业领域应用</li>
            <li>自动化客户服务、助理和调度管理</li>
            <li>内容创作和编辑</li>
            <li>数据分析和解释</li>
            <li>教育和培训</li>
            <li>编程辅助</li>
            <li>多语言支持</li>
          </ul>
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-800">
            文无AIGC通识库
          </h2>
          <!-- <p class="text-sm text-gray-600">
            如果您需要学习ChatGPT为您带来的强大生产力赋能，您可以添加我们的微信以获取免费的技术支持。同时我们还有300+爱好者同我们一同构建的文无AIGC通识库，紧跟AI前沿更新迭代，更好用，更全面，更新鲜。您可以保存下方图片并在微信中扫码添加我们的助理老师免费领取，加入知识圈。也可以添加微信：wenwu11226。
          </p> -->
          <img src="https://kanekikeh.online/calvin/%E5%AE%A3%E4%BC%A0%E6%B5%B7%E6%8A%A5.png" alt="微信公众号二维码" class="">
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-800">
            积分福利
          </h2>
          <ul class="list-disc pl-5 text-sm text-gray-600">
            <li>抢先体验低价GPT4</li>
            <!-- <li>了解更多: 想要获得更多积分，请点击阅读原文获取更多信息。</li> -->
          </ul>
        </section>
      </div>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
/* Tailwind CSS 已经充分利用 */
</style>
