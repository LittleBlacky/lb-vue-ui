// ripple.js
export const Ripple = {
  mounted(el, binding) {
    el.style.position = "relative";
    el.style.overflow = "hidden";

    el.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 设置样式
      ripple.className = "ripple-effect";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${x - size / 2}px`;
      ripple.style.top = `${y - size / 2}px`;
      ripple.style.backgroundColor =
        binding.value?.color || "var(--lb-color-primary)";
      ripple.style.animationDuration = `${binding.value?.duration || 600}ms`;

      el.appendChild(ripple);

      ripple.addEventListener("animationend", () => ripple.remove());
    });
  },
};

// 全局样式
const style = document.createElement("style");
style.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    opacity: 0.3;
    transform: scale(0);
    animation: ripple linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
