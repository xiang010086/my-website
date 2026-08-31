import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE } from "./motion";
import { useModalFocus } from "../lib/modal";

/**
 * 整页弹层：从底部滑入，像翻到下一页；内容区自己滚动（data-native-scroll）。
 * ESC / 关闭按钮退出。打开时锁定页面滚动。
 */
export default function SectionOverlay({
  title,
  kicker,
  onClose,
  children,
}: {
  title: string;
  kicker: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const { dialogRef, closeRef } = useModalFocus(onClose);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      ref={dialogRef}
      className="paper-bg fixed inset-0 z-[60]"
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.55, ease: EASE }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* 顶栏：标题 + 关闭 */}
      <div className="sticky top-0 z-10 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <p className="flex items-baseline gap-3">
            <span className="font-mono text-xs font-bold tracking-[0.3em] text-coralText">
              {kicker}
            </span>
            <span className="text-lg font-black tracking-tight">{title}</span>
          </p>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="关闭"
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-paper text-lg font-black shadow-hardsm transition-transform hover:-translate-y-0.5 hover:bg-sun active:translate-y-0"
          >
            ×
          </button>
        </div>
      </div>

      {/* 内容区：自己滚动，不受页面惯性滚动接管 */}
      <div data-native-scroll className="h-[calc(100%-64px)] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          className="mx-auto max-w-6xl px-5 py-12 md:py-16"
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
