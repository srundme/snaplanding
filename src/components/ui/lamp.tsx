import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type LampContainerProps = {
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  position?: "default" | "hero";
  "aria-hidden"?: boolean;
};

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Build lamps <br /> the right way
      </motion.h1>
    </LampContainer>
  );
}

export function LampContainer({
  children,
  className,
  contentClassName,
  position = "default",
  "aria-hidden": ariaHidden,
}: LampContainerProps) {
  const reduce = useReducedMotion();
  const isHero = position === "hero";

  const beamTransition = reduce
    ? { duration: 0 }
    : { delay: 0.3, duration: 0.8, ease: "easeInOut" as const };

  const beamInitial = reduce
    ? { opacity: 1, width: "30rem" }
    : { opacity: 0.5, width: "15rem" };

  const lineInitial = reduce ? { width: "30rem" } : { width: "15rem" };
  const coreInitial = reduce ? { width: "16rem" } : { width: "8rem" };

  const lineOffset = isHero
    ? "-translate-y-[13.5rem] md:-translate-y-[14.5rem]"
    : "-translate-y-[7rem]";
  const coreOffset = isHero
    ? "-translate-y-[12.5rem] md:-translate-y-[13.5rem]"
    : "-translate-y-[6rem]";
  const glowOffset = isHero
    ? "-translate-y-[13.5rem] md:-translate-y-[14.5rem]"
    : "-translate-y-1/2";
  /* h-56 beams are centered; shift so their top edge meets the line */
  const beamShift = isHero
    ? "-translate-y-[6.5rem] md:-translate-y-[7.5rem]"
    : undefined;
  const veilOffset = isHero
    ? "-translate-y-[19rem] md:-translate-y-[20rem]"
    : "-translate-y-[12.5rem]";
  const sceneOffset = isHero
    ? "-translate-y-4 md:-translate-y-6 lg:-translate-y-8"
    : undefined;

  const maskFill = isHero ? "bg-[#050607]/45" : "bg-surface-0";
  const veilFill = isHero ? "bg-transparent" : "bg-surface-0";
  const beamFrom = isHero ? "from-logo-bar-light" : "from-brand-teal";
  const beamTo = isHero ? "to-logo-bar-light" : "to-brand-teal";
  const glowSoft = isHero ? "bg-logo-bar-mid/50" : "bg-brand-teal";
  const glowCore = isHero ? "bg-logo-bar-light/40" : "bg-brand-teal/80";
  const glowLine = isHero ? "bg-logo-bar-light/35" : "bg-brand-teal";

  return (
    <div
      aria-hidden={ariaHidden}
      className={cn(
        "relative z-0 flex w-full flex-col items-center justify-center overflow-hidden rounded-md bg-surface-0",
        className,
      )}
    >
      <div
        className={cn(
          "relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center",
          sceneOffset,
        )}
      >
        <motion.div
          initial={beamInitial}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={beamTransition}
          viewport={{ once: true, amount: 0.2 }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className={cn(
            "absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-conic via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]",
            beamFrom,
            isHero && beamShift,
          )}
        >
          <div className={cn("absolute bottom-0 left-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]", maskFill)} />
          <div className={cn("absolute bottom-0 left-0 z-20 h-full w-40 [mask-image:linear-gradient(to_right,white,transparent)]", maskFill)} />
        </motion.div>

        <motion.div
          initial={beamInitial}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={beamTransition}
          viewport={{ once: true, amount: 0.2 }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className={cn(
            "absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent text-white [--conic-position:from_290deg_at_center_top]",
            beamTo,
            isHero && beamShift,
          )}
        >
          <div className={cn("absolute bottom-0 right-0 z-20 h-full w-40 [mask-image:linear-gradient(to_left,white,transparent)]", maskFill)} />
          <div className={cn("absolute bottom-0 right-0 z-20 h-40 w-full [mask-image:linear-gradient(to_top,white,transparent)]", maskFill)} />
        </motion.div>

        <div
          className={cn(
            "absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl",
            maskFill,
            isHero && beamShift,
          )}
        />
        <div
          className={cn(
            "absolute top-1/2 h-48 w-full translate-y-12 bg-transparent opacity-10 backdrop-blur-md",
            isHero && beamShift,
          )}
        />
        <div
          className={cn(
            "absolute inset-auto z-50 h-36 w-[28rem] rounded-full opacity-50 blur-3xl",
            glowOffset,
            glowSoft,
          )}
        />

        <motion.div
          initial={coreInitial}
          whileInView={{ width: "16rem" }}
          transition={beamTransition}
          viewport={{ once: true, amount: 0.2 }}
          className={cn(
            "absolute inset-auto z-30 h-36 w-64 rounded-full blur-2xl",
            glowCore,
            coreOffset,
          )}
        />

        <motion.div
          initial={lineInitial}
          whileInView={{ width: "30rem" }}
          transition={beamTransition}
          viewport={{ once: true, amount: 0.2 }}
          className={cn(
            "absolute inset-auto z-50 h-0.5 w-[30rem]",
            glowLine,
            lineOffset,
          )}
        />

        <div
          className={cn(
            "absolute inset-auto z-40 h-44 w-full",
            veilFill,
            veilOffset,
          )}
        />
      </div>

      {children ? (
        <div
          className={cn(
            "relative z-50 flex -translate-y-80 flex-col items-center px-5",
            contentClassName,
          )}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
