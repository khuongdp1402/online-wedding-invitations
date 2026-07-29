export class TelegramAdapter {
  /**
   * Send a message to a Telegram chat.
   */
  async sendMessage(chatId: string, message: string) {
    // Phase 4 implementation will go here
    console.log(`[Telegram Mock] Sending to ${chatId}: ${message}`);
  }
}

export const telegramAdapter = new TelegramAdapter();
