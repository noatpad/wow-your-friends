import { readable } from "svelte/store";

type BreakpointName = 'default' | 'mobile' | 'small';
interface Break { name: BreakpointName, width: number };
interface Breakpoint { name: BreakpointName, query: string };
interface Listener { mql: MediaQueryList, handler: (e: MediaQueryListEvent) => void }

// Change the breaks to use here!
const breaks: Break[] = [
  { name: 'mobile', width: 620 },
  { name: 'small', width: 870 }
];
breaks.sort((a, b) => a.width - b.width);

const breakpoints: Breakpoint[] = breaks.map(({ name, width }, i, arr) => {
  const criteria = ['screen'];
  if (i > 0) criteria.push(`(min-width: ${arr[i - 1].width + 1}px)`);
  criteria.push(`(max-width: ${width}px)`);
  const query = criteria.join(' and ');
  return { name, query };
});
breakpoints.push({
  name: 'default',
  query: `screen and (min-width: ${breaks[breaks.length - 1].width + 1}px)`
});

const getDefaultBreakpoint = (): BreakpointName => {
  for (const { name, query } of breakpoints) {
    if (window.matchMedia(query).matches) return name;
  }
  return 'default';
}

const breakpoint = readable(getDefaultBreakpoint(), (set) => {
  const listeners: Listener[] = breakpoints.map(({ name, query }) => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => { if (e.matches) set(name) };
    mql.addEventListener('change', handler);
    return { mql, handler };
  });

  return () => listeners.forEach(((l) => l.mql.removeEventListener('change', l.handler)));
});

export default breakpoint;
