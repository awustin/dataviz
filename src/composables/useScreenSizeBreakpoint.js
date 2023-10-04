import { computed, onMounted, onUnmounted, ref } from "vue"

export const useScreenSizeBreakpoint = (breakpoint = 600) => {
  let windowWidth = ref(window.innerWidth);
  const isSmall = computed(() => windowWidth.value <= breakpoint);
  const onWidthChange = () => windowWidth.value = window.innerWidth;

  onMounted(() => window.addEventListener('resize', onWidthChange));
  onUnmounted(() => window.removeEventListener('resize', onWidthChange));

  return isSmall;
}