// Auto-generated.
// Do not edit manually.

import { date, field, text } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class Channel extends Model {
  static table = "channels";

  // @field("id") channelId;
  @date("inserted_at") insertedAt;
  @text("slug") slug;
  @field("created_by") created_by;
}
