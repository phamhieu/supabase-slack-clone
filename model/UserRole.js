// Auto-generated.
// Do not edit manually.

import { field, text } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class UserRole extends Model {
  static table = "user_roles";

  @field("user_id") userId;
  @text("role") role;
}
