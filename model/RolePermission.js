// Auto-generated.
// Do not edit manually.

import { field, text } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class RolePermission extends Model {
  static table = "role_permissions";

  @field("id") rolePermissionId;
  @text("role") role;
  @text("permission") permission;
}
