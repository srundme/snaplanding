/**
 * GSAP entry — import only what you use to keep the landing bundle lean.
 * Usage: import { gsap, useGSAP, ScrollTrigger } from "../lib/gsap";
 */
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

export { gsap, useGSAP, ScrollTrigger, ScrollToPlugin, SplitText };
