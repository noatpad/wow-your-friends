import { quartOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

interface CardSlideConfig {
  tilt: number,
  duration: number,
  delay: number
}

const cardSlide = (_: Element, { tilt = 0, duration = 800, delay = 0 }: Partial<CardSlideConfig> = {}): TransitionConfig => {
  const clockwise = (tilt <= 0);
  return {
    duration,
    delay,
    easing: quartOut,
    css: (t) => {
      const ty = (1 - t) * -100;
      const r = tilt + ((1 - t) * (clockwise ? 5 : -5));
      return `
        opacity: ${t};
        transform: translateY(${ty}%) rotate(${r}deg);
      `
    }
  };
};

export default cardSlide;
