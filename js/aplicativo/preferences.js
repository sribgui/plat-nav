export function applySavedPreferences() {
    const contentWrapper = document.getElementById('content-wrapper');
    const widthSlider = document.getElementById('width-slider');
    const savedWidth = localStorage.getItem('readingWidth');
    if (savedWidth && contentWrapper && widthSlider) {
        contentWrapper.style.maxWidth = savedWidth;
        widthSlider.value = parseInt(savedWidth, 10);
    }
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.dataset.theme = savedTheme;
}