// Auto-generated.
// Do not edit manually.

import { field, text, date } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class Message extends Model {
  static table = "messages";

  // @field("id") messageId;
  @text("message") message;
  @date("inserted_at") insertedAt;
  @field("user_id") userId;
  @field("channel_id") channelId;
}
