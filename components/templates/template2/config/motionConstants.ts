/**
 * WSDD Vol.4 §2 — Motion Dictionary
 * Tập trung hóa tất cả easing curves và durations.
 * Mọi component MUST import từ file này, NEVER hardcode easing strings.
 */

// Easing — NEVER use "linear" (trừ khi xoay đĩa nhạc)
export const EASE_LUXURY = "power4.inOut";    // Chuyển cảnh, mở phong thư
export const EASE_FLOAT  = "sine.inOut";      // Vật thể trôi nổi nhẹ nhàng
export const EASE_SPRING = "back.out(1.7)";   // Nút bấm, Card nảy ra
export const EASE_SMOOTH = "power2.out";      // Color of Time transitions

// Duration (seconds)
export const DURATION_SLOW = 1.5;             // Chuyển cảnh thông thường
export const DURATION_EPIC = 10;              // Hero Zoom (Vol.1 §4)
export const DURATION_AUDIO_FADE = 3;         // Audio fade in/out
