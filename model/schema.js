import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "channels",
      columns: [
        { name: "inserted_at", type: "string" },
        { name: "slug", type: "string" },
        { name: "created_by", type: "string" },
      ],
    }),
    tableSchema({
      name: "messages",
      columns: [
        { name: "message", type: "string" },
        { name: "inserted_at", type: "string" },
        { name: "user_id", type: "string" },
        { name: "channel_id", type: "string" },
      ],
    }),
    tableSchema({
      name: "role_permissions",
      columns: [
        { name: "role", type: "string" },
        { name: "permission", type: "string" },
      ],
    }),
    tableSchema({
      name: "user_roles",
      columns: [
        { name: "user_id", type: "string" },
        { name: "role", type: "string" },
      ],
    }),
    tableSchema({
      name: "users",
      columns: [
        { name: "username", type: "string" },
        { name: "status", type: "string" },
      ],
    }),
  ],
});
