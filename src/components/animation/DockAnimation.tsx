'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type SpringOptions,
} from 'framer-motion';
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';
import React from 'react';

/* ------------------------ Constants ------------------------ */
const DOCK_HEIGHT = 128;
const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 150;
const DEFAULT_PANEL_HEIGHT = 64;

/* ------------------------ Types ------------------------ */
interface DockProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  panelHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
}
interface DockItemProps {
  children: React.ReactNode;
  className?: string;
}
interface DockLabelProps {
  children: React.ReactNode;
  className?: string;
}
interface DockIconProps {
  children: React.ReactNode;
  className?: string;
  width?: MotionValue<number>;
  isHovered?: MotionValue<number>;
}
interface DockContextType {
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  magnification: number;
  distance: number;
}

/* ------------------------ Context ------------------------ */
const DockContext = createContext<DockContextType | undefined>(undefined);

function useDock() {
  const context = useContext(DockContext);
  if (!context) throw new Error('useDock must be used within a DockProvider');
  return context;
}

/* ------------------------ Dock Provider ------------------------ */
const DockProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: DockContextType;
}) => <DockContext.Provider value={value}>{children}</DockContext.Provider>;

/* ------------------------ Dock Root ------------------------ */
function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4),
    [magnification]
  );

  const height = useSpring(
    useTransform(isHovered, [0, 1], [panelHeight, maxHeight]),
    spring
  );

  return (
    <motion.div
      style={{ height, scrollbarWidth: 'none' }}
      className="mx-0 sm:mx-2 flex max-w-full items-end overflow-x-auto"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={cn(
          'mx-auto flex w-fit gap-1.5 sm:gap-4 rounded-2xl bg-gray-50 px-4 dark:bg-neutral-900',
          className
        )}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockProvider value={{ mouseX, spring, distance, magnification }}>
          {children}
        </DockProvider>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------ Dock Item ------------------------ */
function DockItem({ children, className }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { distance, magnification, mouseX, spring } = useDock();

  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - domRect.x - domRect.width / 2;
  });

  const width = useSpring(
    useTransform(mouseDistance, [-distance, 0, distance], [40, magnification, 40]),
    spring
  );

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={cn('relative inline-flex items-center justify-center', className)}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        React.isValidElement(child)
        ? cloneElement(child, { width, isHovered } as Partial<DockIconProps & DockLabelProps>)
        : child
      )}
    </motion.div>
  );
}

/* ------------------------ Dock Label ------------------------ */
function DockLabel({ children, className, ...rest }: DockLabelProps) {
  const isHovered = (rest as { isHovered?: MotionValue<number> })['isHovered'];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white',
            className
          )}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------ Dock Icon ------------------------ */
function DockIcon({ children, className, width }: DockIconProps) {
  const widthTransform = useTransform(width ?? useMotionValue(40), (val) => val / 2);

  return (
    <motion.div
      style={{ width: widthTransform }}
      className={cn('flex items-center justify-center', className)}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------ Exports ------------------------ */
export { Dock, DockItem, DockLabel, DockIcon };
