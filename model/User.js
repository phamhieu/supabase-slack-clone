// Auto-generated.
// Do not edit manually.

import { text } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class User extends Model {
  static table = "users";
  static associations = {
    messages: { type: "has_many", foreignKey: "user_id" },
    channels: { type: "has_many", foreignKey: "created_by" },
  };

  @text("username") username;
  @text("status") status;
}
