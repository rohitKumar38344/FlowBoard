// Type-safe lazyLoad utility implementation

function lazyLoad<T>(element: T, callback: () => void): void {
    if (element instanceof HTMLElement) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        callback();
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(element);
        } else {
            // Fallback for browsers without IntersectionObserver
            callback();
        }
    }
}

export default lazyLoad;