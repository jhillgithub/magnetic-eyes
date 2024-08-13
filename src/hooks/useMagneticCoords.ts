import {
  MotionValue,
  useMotionValue,
  useSpring,
  SpringOptions,
} from "framer-motion";
import React from "react";
import { remapRange } from "../lib/utils";

interface MagneticConfig {
  strength?: number;
  spring?: SpringOptions;
}

export const useMagneticCoords = ({
  strength = 32.0,
  spring = { damping: 2, stiffness: 100, restDelta: 0.001 },
}: MagneticConfig = {}) => {
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
    xPoint.set(xRange * strength);
    yPoint.set(yRange * strength);
  };

  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  return {
    x,
    y,
    setTransform,
  };
};
