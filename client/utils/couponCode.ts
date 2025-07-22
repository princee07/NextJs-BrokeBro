// Utility to get a daily-changing coupon code for a product

export function getDailyCouponCode(productId: number, baseCode: string): string {
    // Use the current date (YYYY-MM-DD) and productId to generate a new code every 24 hours
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10); // e.g., '2025-07-22'
    // Simple hash: baseCode + date + productId
    const hash = btoa(`${baseCode}-${productId}-${dateStr}`).replace(/=/g, '').slice(0, 10).toUpperCase();
    return `${baseCode}-${hash}`;
}
