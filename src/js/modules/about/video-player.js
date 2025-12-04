export function initVideoPlayer() {
    const overlay = document.querySelector('.video__overlay');
    const iframe = document.querySelector('.video__file');

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        iframe.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
        );
    });
}