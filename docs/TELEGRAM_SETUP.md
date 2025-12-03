# Telegram Integration Setup Guide

This guide explains how to set up Telegram integration for guest messages on your wedding website.

## Overview

When guests submit messages through your website, they will:
1. Be saved to the Supabase database
2. Be sent to your Telegram group in real-time
3. Allow you to receive and respond to messages instantly

## Prerequisites

- A Telegram account
- Access to create a Telegram bot
- A Telegram group where you want to receive messages

## Step 1: Create a Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Start a chat with BotFather
3. Send the command: `/newbot`
4. Follow the prompts:
   - Choose a name for your bot (e.g., "Wedding Messages Bot")
   - Choose a username (must end in 'bot', e.g., "sarahandalex_wedding_bot")
5. BotFather will give you a **bot token** - save this! It looks like:
   ```
   123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

## Step 2: Create a Telegram Group

1. In Telegram, create a new group
2. Name it something like "Wedding Messages"
3. Add your bot to the group:
   - Click on the group name
   - Click "Add Members"
   - Search for your bot's username
   - Add it to the group

## Step 3: Get Your Chat ID

There are two methods to get your chat ID:

### Method A: Using a Bot (Easiest)

1. Add [@userinfobot](https://t.me/userinfobot) to your group
2. The bot will send a message with the group's chat ID
3. Remove @userinfobot from the group after getting the ID

### Method B: Using the Telegram API

1. Send a message in your group (mention your bot with @)
2. Open this URL in your browser (replace YOUR_BOT_TOKEN):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
3. Look for `"chat":{"id":-123456789}` in the response
4. The number (including the minus sign) is your chat ID

## Step 4: Configure Environment Variables

1. Open your `.env.local` file (or create it from `.env.example`)
2. Add your Telegram credentials:
   ```env
   TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   TELEGRAM_CHAT_ID=-123456789
   ```

**Important Notes:**
- The chat ID for groups is usually negative (starts with -)
- Keep your bot token secret - never commit it to version control
- The bot token should be kept in `.env.local`, not `.env.example`

## Step 5: Test the Integration

1. Restart your development server:
   ```bash
   bun run dev
   ```

2. Submit a test message through your website's guest message form

3. Check your Telegram group - you should receive a message like:
   ```
   💌 New Guest Message

   👤 From: John Doe

   📝 Message:
   Congratulations on your wedding! Can't wait to celebrate with you!
   ```

## Message Format

Messages sent to Telegram include:
- 💌 Emoji indicator for new messages
- 👤 Guest name
- 📝 Message content
- Timestamp (automatic from Telegram)

## Troubleshooting

### Bot not sending messages

**Check 1: Bot token is correct**
- Verify the token in `.env.local` matches the one from BotFather
- Make sure there are no extra spaces

**Check 2: Chat ID is correct**
- Verify the chat ID (including the minus sign for groups)
- Make sure the bot is still a member of the group

**Check 3: Bot permissions**
- Ensure the bot has permission to send messages in the group
- Check group settings → Administrators → Bot permissions

### Messages not appearing in Telegram

**Check the server logs:**
```bash
# Look for Telegram-related errors in your terminal
```

**Test the bot manually:**
```bash
# Send a test message using curl
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id": "<YOUR_CHAT_ID>", "text": "Test message"}'
```

### Environment variables not loading

- Restart your development server after changing `.env.local`
- Verify the file is named exactly `.env.local` (not `.env.local.txt`)
- Check that `.env.local` is in the project root directory

## Optional: Webhook for Approving Messages

You can set up a webhook to approve messages directly from Telegram:

1. Set up a webhook URL:
   ```bash
   curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://your-domain.com/api/telegram/webhook"}'
   ```

2. Use commands in Telegram to approve messages:
   ```
   /approve <message-id>
   ```

This feature is implemented in the API route at `app/api/telegram/webhook/route.ts`.

## Security Best Practices

1. **Never commit your bot token** to version control
2. **Use environment variables** for all sensitive data
3. **Validate webhook requests** if using webhooks
4. **Limit bot permissions** to only what's needed
5. **Monitor bot activity** regularly

## Advanced Features

### Custom Message Formatting

You can customize the message format in `lib/telegram/client.ts`:

```typescript
const telegramMessage = {
  chat_id: chatId,
  text: `💌 New Guest Message\n\n👤 From: ${guestName}\n\n📝 Message:\n${message}`,
  parse_mode: 'HTML', // or 'Markdown'
};
```

### Adding Buttons

You can add inline buttons to messages:

```typescript
const telegramMessage = {
  chat_id: chatId,
  text: `💌 New Guest Message\n\n👤 From: ${guestName}\n\n📝 Message:\n${message}`,
  reply_markup: {
    inline_keyboard: [
      [
        { text: '✅ Approve', callback_data: `approve_${messageId}` },
        { text: '❌ Reject', callback_data: `reject_${messageId}` },
      ],
    ],
  },
};
```

## Support

If you encounter issues:
1. Check the [Telegram Bot API documentation](https://core.telegram.org/bots/api)
2. Review the server logs for error messages
3. Test the bot token and chat ID manually using curl
4. Ensure your bot has the necessary permissions in the group

## Next Steps

After setting up Telegram integration:
1. Test with multiple messages
2. Set up message approval workflow (optional)
3. Configure notification preferences
4. Train your team on responding to messages

---

**Requirements Validated:**
- ✅ 14.1: Messages sent to Telegram group
- ✅ 14.2: Guest name and message included
- ✅ 14.3: Environment variables configured
- ✅ 14.4: Graceful error handling
