document.addEventListener('DOMContentLoaded', () => {
    const copyableElements = document.querySelectorAll('.content-text.copyable');
    const toast = document.querySelector('.copy-toast');

    copyableElements.forEach(element => {
        element.addEventListener('click', () => {
            const text = element.textContent;
            navigator.clipboard.writeText(text).then(() => {
                toast.textContent = `已复制: ${text}`;
                toast.classList.add('show');
                setTimeout(() => toast.classList.remove('show'), 2000);
            });
        });
    });
});