import { useLayoutEffect, useState } from 'react';
import breakpoints from 'tailwind.config.breakpoints';

type BreakpointName = keyof typeof breakpoints | null;

const bpPairs: [number, string][] = [];
const widths: number[] = [];
const bpNames: BreakpointName[] = [];

Object.keys(breakpoints).forEach((bpName) => {
  const width = parseInt(breakpoints[bpName as Exclude<BreakpointName, null>]);
  bpPairs.push([width, bpName]);
});

bpPairs.sort((a, b) => {
  return a[0] - b[0];
});

bpPairs.forEach(([width, bpName]) => {
  widths.push(width);
  bpNames.push(bpName as BreakpointName);
});

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

const getBpName = (width: number) => {
  for (let index = 0; index < widths.length; index++) {
    const bpWidth = widths[index];
    if (width < bpWidth) {
      if (index === 0) return null;
      return bpNames[index - 1];
    }
  }
  return bpNames[bpNames.length - 1];
};

export const useBreakpoint = () => {
  const [bpName, setBpName] = useState<BreakpointName>(null);
  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      const nextBpName = getBpName(width);
      if (bpName !== nextBpName) setBpName(nextBpName);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [bpName]);

  return bpName;
};
