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

  @field("created_by") created_by;
  @date("inserted_at") insertedAt;
  @text("slug") slug;

  @immutableRelation("users", "created_by") author;
  @children("messages") messages;

  async markAsDeleted() {
    await this.messages.destroyAllPermanently();
    await super.markAsDeleted();
  }
}
