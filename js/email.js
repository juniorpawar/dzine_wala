(function () {
    emailjs.init("OkpLU8pDZAjl3XzKE"); // from EmailJS dashboard
})();

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_qqna7rn', 'template_gxwddip', this)
        .then(() => {
            alert('✅ Message sent successfully!');
        }, (err) => {
            console.error('❌ Error:', err);
            alert('Failed to send message.');
        });
});