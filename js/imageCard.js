const images = document.querySelectorAll('.clickable-image');
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('fullImage');
const closeBtn = document.querySelector('.close');
const content = document.querySelector('.content');

// When an image is clicked
images.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
        content.classList.add('blur');
    });
});

// When the close button is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    content.classList.remove('blur');
});

// Also close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        content.classList.remove('blur');
    }
});
