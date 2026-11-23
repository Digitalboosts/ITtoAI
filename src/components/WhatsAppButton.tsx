import React from 'react';

const WHATSAPP_NUMBER = '919341171960';
const DEFAULT_MESSAGE = 'Hi ITtoAI, I have a question.';

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
      style={{ background: '#25D366' }}
    >
      <svg viewBox="0 0 24 24" width={28} height={28} fill="#FFFFFF" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.26-8.24Zm-4.53 4.3c-.17 0-.44.06-.67.32-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.02 2.57.12.16 1.74 2.78 4.29 3.79.6.24 1.06.38 1.43.48.6.16 1.15.14 1.58.09.48-.07 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.07-.1-.24-.16-.5-.29-.26-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.13-.17.25-.65.81-.79.98-.15.16-.29.18-.55.06-.26-.13-1.08-.4-2.06-1.28-.76-.68-1.28-1.51-1.42-1.77-.15-.25-.02-.39.11-.51.11-.11.26-.29.38-.44.13-.14.17-.25.26-.41.08-.16.04-.31-.02-.44-.06-.13-.56-1.37-.78-1.87-.2-.49-.41-.42-.56-.43l-.48-.01Z" />
      </svg>
    </a>
  );
}
