<script lang="ts" setup>
import { ref, watch } from 'vue';
import { NDrawer, NDrawerContent } from 'naive-ui';
import { homeStore } from '@/store';
import { useBasicLayout } from '@/hooks/useBasicLayout';

const { isMobile } = useBasicLayout();
const st = ref({ show: false });

// 监听活动状态，对应于公告弹窗
watch(() => homeStore.myData.act, (act) => {
  if (act === 'announcement') {
    st.value.show = true;
  }
});

function closeDrawer() {
  st.value.show = false;
}
</script>

<template>
  <NDrawer v-model:show="st.show" :placement="isMobile ? 'bottom' : 'right'"
           :class="isMobile ? ['!h-[90vh]'] : ['!w-[50vw]']" style="--n-body-padding:0">
    <NDrawerContent title="最新公告" closable @close="closeDrawer">
      <!-- 公告内容 -->
      <div class="p-4 space-y-4">
        <section>
          <h2 class="text-xl font-bold text-gray-800">一、最新公告</h2>
          <p class="text-sm text-gray-600">更新日期：2024年4月19日</p>
          <ul class="list-disc pl-5">
            <li>最新网址以及备用网址：请访问 <a href="#" class="text-blue-500 hover:underline">www.example.com</a></li>
            <li>最新支持的模型：GPT-4</li>
            <li>优惠活动情况：详情请见促销页面</li>
          </ul>
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-800">二、模型定价</h2>
          <p class="text-sm text-gray-600">详细定价信息，请查阅我们的定价页面。</p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-800">三、AI知识库推荐</h2>
          <p class="text-sm text-gray-600">探索我们的AI知识库，获取更多关于人工智能的学习资料。</p>
        </section>
        <section>
          <h2 class="text-xl font-bold text-gray-800">四、反馈通道</h2>
          <ul class="list-disc pl-5">
            <li>微信公众号：<img src="#" alt="微信公众号二维码" class="w-20 h-20"></li>
            <li>客服助手公众号：<img src="#" alt="客服助手公众号二维码" class="w-20 h-20"></li>
          </ul>
        </section>
      </div>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
/* Tailwind CSS 已经充分利用 */
</style>
