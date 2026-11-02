/* ==========================================================================
   DUM — Vite entry point
   Imports styles, fonts, GSAP + ScrollTrigger, then boots the app.
   ========================================================================== */

import './styles.css';
import './fonts.css';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Expose on window so the app.js IIFE (which checks window.gsap) works.
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

// Boot the app after GSAP is on the window object.
import('./app.js');
