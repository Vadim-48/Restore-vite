export function activeMenuItem() {
  const links = document.querySelectorAll(".nav__menu-link");
  const currentPath = window.location.pathname.toLowerCase();
  const currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1);

  links.forEach(link => {
    let linkHref = link.getAttribute("href");

    if (!linkHref || linkHref === "#!" || linkHref.startsWith("http")) return;

    // прибираємо './' та будь-які слеші на початку
    linkHref = linkHref.replace(/^\.\/+/, "").toLowerCase();

    if (linkHref === currentPage) {
      link.classList.add("active");
    }
  });
}

