export function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        console.log('Debounce triggered with:', args);  // Log khi debounce được gọi

        if (timeoutId) {
            clearTimeout(timeoutId);  // Hủy bỏ lần gọi trước
        }

        timeoutId = setTimeout(() => {
            console.log('Executing debounced function');  // Log khi hàm thực thi
            func(...args);  // Gọi hàm thực thi
        }, delay);
    };
}
