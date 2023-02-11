import { HTMLMotionProps, motion } from 'framer-motion';
import * as React from 'react';

export const fadeInOutProps = {
  initial: 'hidden',
  animate: 'enter',
  exit: 'exit',
  variants: {
    hidden: { opacity: 0, x: -0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 0 },
  },
  transition: { duration: 0.3 },
};

const FadeDiv: React.FC<HTMLMotionProps<'div'>> = ({ children, ...props }) => {
  return (
    <motion.div {...fadeInOutProps} {...props}>
      {children}
    </motion.div>
  );
};

const exports = {
  div: FadeDiv,
};

export default exports;
