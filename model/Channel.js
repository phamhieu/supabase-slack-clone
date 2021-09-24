// Auto-generated.
// Do not edit manually.

import {
  children,
  date,
  field,
  text,
  immutableRelation,
} from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class Channel extends Model {
  static table = "channels";
  static associations = {
    messages: { type: "has_many", foreignKey: "channel_id" },
    users: { type: "belongs_to", key: "created_by" },
  };

  @date("inserted_at") insertedAt;
  @text("slug") slug;
  @field("created_by") created_by;

  @immutableRelation("users", "created_by") author;
  @children("messages") messages;
}
