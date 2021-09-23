// Auto-generated.
// Do not edit manually.

import { field, text } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class User extends Model {
  static table = "users";

  @field("id") userId;
  @text("username") username;
  @text("status") status;
}
