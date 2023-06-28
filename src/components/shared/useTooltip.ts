import Tooltip from "./Tooltip.svelte";

const tooltip = (element: HTMLElement, text: string) => {
  if (!text) return {};

  let component: Tooltip;

  const mouseOver = () => {
    const { x, y, width } = element.getBoundingClientRect();
    component = new Tooltip({
      props: {
        x: x + (width / 2),
        y,
        text
      },
      target: document.body
    });
  };

  const mouseLeave = () => component.$destroy();

  element.addEventListener('mouseover', mouseOver);
  element.addEventListener('mouseleave', mouseLeave);

  return {
    update(newText) {
      text = newText;
    },
    destroy() {
      element.removeEventListener('mouseover', mouseOver);
      element.removeEventListener('mouseleave', mouseLeave);
    }
  }
};

export default tooltip;
