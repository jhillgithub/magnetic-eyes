import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React from "react";
import { remapRange } from "../lib/utils";

const MAGNETIC_STRENGTH = 32.0;

export const Eyes = () => {
  const setTransform = (
    item: HTMLElement & EventTarget,
    event: React.PointerEvent,
    x: MotionValue,
    y: MotionValue
  ) => {
    const { left, top, width, height } = item.getBoundingClientRect();
    const relativeX = event.clientX - left;
    const relativeY = event.clientY - top;
    const xRange = remapRange(relativeX, 0, width, -1, 1);
    const yRange = remapRange(relativeY, 0, height, -1, 1);
    xPoint.set(xRange * MAGNETIC_STRENGTH);
    yPoint.set(yRange * MAGNETIC_STRENGTH);
  };
  const spring = { damping: 2, stiffness: 100, restDelta: 0.001 };
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  const eyeX = useTransform(x, (latest) => latest * 0.33);
  const eyeY = useTransform(y, (latest) => latest * 0.38);

  return (
    <>
      <motion.div
        className="h-screen aspect-square bg-green-200 grid place-content-center"
        onPointerMove={(event) => {
          const item = event.currentTarget;
          setTransform(item, event, x, y);
        }}
        onPointerLeave={(event) => {
          x.set(0);
          y.set(0);
        }}
      >
        <motion.div style={{ x, y }} className="flex gap-4">
          <div className="w-40 h-40 rounded-full bg-white border-black  border-2 p-2 grid place-content-center">
            <motion.div
              className="ml-4 rounded-full bg-black w-28 h-28"
              style={{ x: eyeX, y: eyeY }}
            ></motion.div>
          </div>
          <div className="w-40 h-40 rounded-full bg-white border-black  border-2 p-2 grid place-content-center">
            <motion.div
              className="mt-4 -ml-4 rounded-full bg-black w-28 h-28"
              style={{ x: eyeX, y: eyeY }}
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
