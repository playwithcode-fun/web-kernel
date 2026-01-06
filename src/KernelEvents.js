class KernelEvents extends EventTarget {
    on(type, handler, options = {}) {
        this.addEventListener(type, handler, options);

        return () => this.off(type, handler);
    }

    once(type, handler) {
        this.addEventListener(type, handler, {
            once: true
        });
    }

    off(type, handler) {
        this.removeEventListener(type, handler);
    }

    emit(type, detail = {}) {
        return this.dispatchEvent(new CustomEvent(type, { detail }));
    }

    destroy() {
        //
    }
}

export default KernelEvents;