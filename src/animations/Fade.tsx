import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import * as React from 'react';

const Fade: React.FC<HTMLMotionProps<'div'>> = ({ children, ...props }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Fade;
