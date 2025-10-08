tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'background': 'var(--bg-color)',
                'text-primary': 'var(--text-color)',
                'accent-primary': 'var(--accent-primary)',
                'accent-secondary': 'var(--accent-secondary)',
                'card-bg': 'var(--card-bg)',
                'border-color': 'var(--border-color)',
            },
            fontFamily: {
                heading: ['Poppins', 'sans-serif'],
                body: ['Satoshi', 'sans-serif'],
            },
        }
    }
}