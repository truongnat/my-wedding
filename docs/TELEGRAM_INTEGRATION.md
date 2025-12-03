# Telegram Integration for Guest Messages

This document explains how to set up Telegram integration for receiving guest message notifications.

## Overview

When a guest submits a message through the website, the system will:
1. Save the message to the Supabase database
2. Send a notification to your configured Telegram group
3. Handle Telegram failures gracefully (message is still saved even if Telegram fails)

## Setup Instructions

### 1. Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/newbot` command
3. Follow the prompts to create your bot
4. Copy the bot token (looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 2. Get Your Chat ID

**Option A: Using a Group**
1. Create a new Telegram group
2. Add your bot to the group
3. Send a message in the group
4. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
5. Look for `"chat":{"id":-1234567890}` in the response
6. Copy the chat ID (including the minus sign if present)

**Option B: Using a Private Chat**
1. Start a chat with your bot
2. Send any message to the bot
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for `"chat":{"id":123456789}` in the response
5. Copy the chat ID

### 3. Configure Environment Variables

Add the following to your `.env.local` file:

```env
TELEGRAM_BOT_TOKEN=your-bot-token-here
TELEGRAM_CHAT_ID=your-chat-id-here
```

**Example:**
```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=-1234567890
```

### 4. Test the Integration

1. Start your development server: `bun run dev`
2. Submit a test guest message through your website
3. Check your Telegram group/chat for the notification

## Message Format

Telegram notifications will appear in this format:

```
💌 New Guest Message

👤 From: John Doe

📝 Message:
This is a test message from the wedding website!
```

## Error Handling

The integration is designed to be resilient:

- **If Telegram is not configured**: Messages are still saved to the database, but no notification is sent
- **If Telegram API fails**: The error is logged, but the message submission succeeds
- **If the database fails**: The entire request fails (database is the critical operation)

## Troubleshooting

### Bot not receiving messages

1. Verify the bot token is correct
2. Ensure the bot is added to the group (if using a group)
3. Check that the chat ID is correct (including minus sign for groups)
4. Verify environment variables are loaded (check server logs)

### Messages not appearing in Telegram

1. Check server logs for Telegram API errors
2. Verify the bot has permission to send messages in the group
3. Test the bot token and chat ID using the Telegram API directly:
   ```bash
   curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage" \
     -H "Content-Type: application/json" \
     -d '{"chat_id":"<YOUR_CHAT_ID>","text":"Test message"}'
   ```

### Environment variables not loading

1. Ensure `.env.local` file exists in the project root
2. Restart your development server after adding environment variables
3. Check that variable names match exactly (case-sensitive)

## API Endpoint

The guest message API is available at:

```
POST /api/guest-messages
```

**Request Body:**
```json
{
  "name": "John Doe",
  "message": "Congratulations on your wedding!"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Message submitted successfully",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "message": "Congratulations on your wedding!",
    "approved": false,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

**Response (Validation Error):**
```json
{
  "error": "Validation failed",
  "details": [
    {
      "code": "too_small",
      "minimum": 1,
      "type": "string",
      "path": ["name"],
      "message": "Name is required"
    }
  ]
}
```

## Security Considerations

1. **Never commit** your bot token or chat ID to version control
2. Use environment variables for all sensitive configuration
3. The bot token should be kept secret - anyone with it can control your bot
4. Consider using Row Level Security (RLS) in Supabase to protect your data

## Future Enhancements

Potential improvements to consider:

1. **Webhook Integration**: Set up a Telegram webhook to receive commands (e.g., `/approve <message_id>`)
2. **Message Moderation**: Add inline buttons in Telegram to approve/reject messages
3. **Rich Formatting**: Use Telegram's formatting options for better message display
4. **Multiple Notifications**: Send to multiple groups or channels
5. **Rate Limiting**: Add rate limiting to prevent spam

## Related Files

- `lib/telegram/client.ts` - Telegram API client implementation
- `app/api/guest-messages/route.ts` - API route with Telegram integration
- `.env.example` - Environment variable template
