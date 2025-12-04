export function initVideoPlayer() {
  const videoSection = document.querySelector('.video');
  if (!videoSection) return;

  videoSection.addEventListener('click', (e) => {
    const overlay = e.target.closest('.video__overlay');
    if (!overlay) return;

    const videoBlock = overlay.closest('.video__wrapper');
    const iframe = videoBlock.querySelector('.video__file');

    overlay.style.display = 'none';
    iframe.contentWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      '*'
    );
  });
}
