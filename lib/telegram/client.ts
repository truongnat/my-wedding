/**
 * Telegram Bot API client for sending guest messages to a Telegram group
 */

interface TelegramMessage {
  chat_id: string | number;
  text: string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
}

interface TelegramResponse {
  success: boolean;
  error?: string;
}

/**
 * Sends a guest message to the configured Telegram group
 *
 * @param guestName - Name of the guest submitting the message
 * @param message - The message content
 * @returns Promise with success status and optional error message
 */
export async function sendTelegramMessage(
  guestName: string,
  message: string
): Promise<TelegramResponse> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Check if Telegram is configured
  if (!botToken || !chatId) {
    console.error('Telegram configuration missing: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');
    return {
      success: false,
      error: 'Telegram not configured',
    };
  }

  // Format the message for Telegram
  const telegramMessage: TelegramMessage = {
    chat_id: chatId,
    text: `💌 New Guest Message\n\n👤 From: ${guestName}\n\n📝 Message:\n${message}`,
    parse_mode: 'HTML',
  };

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(telegramMessage),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Telegram API error:', error);
      return {
        success: false,
        error: error.description || 'Telegram API request failed',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}
