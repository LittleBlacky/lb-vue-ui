import type { RippleBinding } from "./types";
// ripple.js
let styleAdded = false;

const Ripple = {
  name: "ripple",
  mounted(el: HTMLElement, binding: RippleBinding) {
    if (!styleAdded) {
      const style = document.createElement("style");
      style.textContent = `
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          background-color: var(--ripple-color, var(--lb-color-primary));
          animation: ripple var(--ripple-duration, var(--lb-transition-duration-slow)) linear forwards;
          pointer-events: none;
          opacity: 0.3;
          transform: scale(0);
          transform-origin: center;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
      styleAdded = true;
    }

    el.style.position = "relative";
    el.style.overflow = "hidden";

    // 添加防抖
    let lastClickTime = 0;
    const RIPPLE_COOLDOWN = 300;
    el.addEventListener("click", (e) => {
      if (binding?.value.disabled) return;
      const now = Date.now();
      if (now - lastClickTime < RIPPLE_COOLDOWN) return;
      lastClickTime = now;

      const ripple = document.createElement("span");
      ripple.className = "ripple-effect";

      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 使用CSS变量和transform优化
      ripple.style.setProperty("--ripple-color", binding?.value.color || "");
      ripple.style.setProperty(
        "--ripple-duration",
        `${binding?.value.duration || "var(--lb-transition-duration-slow)"})
    }ms`
      );
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x - size / 2}px`;
      ripple.style.top = `${y - size / 2}px`;

      // 使用will-change提示浏览器优化
      ripple.style.willChange = "transform, opacity";

      requestAnimationFrame(() => {
        el.appendChild(ripple);

        // 动画结束后移除
        ripple.addEventListener(
          "animationend",
          () => {
            requestAnimationFrame(() => {
              if (ripple.parentNode) {
                ripple.remove();
              }
            });
          },
          { once: true }
        ); // 使用{once: true}自动移除监听器
      });
    });
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener("click", () => {});
  },
};

export default Ripple;
