/**
 * 锚点滚动保持浏览器原生行为：不劫持滚轮、键盘或触屏，
 * 让各个滚动场景只负责视觉反馈，不改变用户的输入预期。
 */
export function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 70);
  if (Math.abs(targetY - window.scrollY) < 2) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: targetY, behavior: reduce ? "auto" : "smooth" });
}
