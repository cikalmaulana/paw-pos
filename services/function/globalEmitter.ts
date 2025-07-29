type Listener<T> = (data: T) => void

class GlobalEmitter {
    private listeners: Record<string, Listener<any>[]> = {}

    on<T>(event: string, listener: Listener<T>) {
        if (!this.listeners[event]) this.listeners[event] = []
        this.listeners[event].push(listener)
    }

    off<T>(event: string, listener: Listener<T>) {
        if (!this.listeners[event]) return
        this.listeners[event] = this.listeners[event].filter(l => l !== listener)
    }

    emit<T>(event: string, data: T) {
        if (!this.listeners[event]) return
        this.listeners[event].forEach(listener => listener(data))
    }
}

export const globalEmitter = new GlobalEmitter()
