import { motion, useTransform } from "framer-motion";
import React from "react";
import { useMagneticCoords } from "../hooks/useMagneticCoords";

export const Eyes = () => {
  const { x, y, setTransform } = useMagneticCoords();
  // adjust eye movement strength
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
