import { burger } from '@/js/modules/burger.js';
import { activeMenuItem } from '@/js/modules/active-menu-item.js';
import { headerScroll } from "@/js/modules/header-scroll.js";


document.addEventListener("DOMContentLoaded", () => {
  burger();

  activeMenuItem();

  headerScroll();
});