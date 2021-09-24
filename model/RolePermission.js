// Auto-generated.
// Do not edit manually.

import { text } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class RolePermission extends Model {
  static table = "role_permissions";

  @text("role") role;
  @text("permission") permission;
}
