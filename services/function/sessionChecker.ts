export function isSessionExpired(expiredAt?: number): boolean {
    if (!expiredAt) return true 

    return Date.now() > expiredAt
}
