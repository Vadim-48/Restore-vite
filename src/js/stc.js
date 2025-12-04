import { burger } from '@/js/modules/burger.js';
import { headerScroll } from "@/js/modules/header-scroll.js";
import { initVideoPlayer } from '@/js/modules/about/video-play.js';

document.addEventListener("DOMContentLoaded", () => {
  burger();

  headerScroll();

  initVideoPlayer();
});