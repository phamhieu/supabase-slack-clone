// Auto-generated.
// Do not edit manually.

import { field, text, immutableRelation } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class Message extends Model {
  static table = "messages";
  static associations = {
    users: { type: "belongs_to", key: "user_id" },
    channels: { type: "belongs_to", key: "channel_id" },
  };

  @text("message") message;
  @field("inserted_at") insertedAt;
  @field("user_id") userId;
  @field("channel_id") channelId;

  @immutableRelation("users", "user_id") author;
}
