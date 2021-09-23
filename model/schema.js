import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "channels",
      columns: [
        { name: "id", type: "number" },
        { name: "inserted_at", type: "string" },
        { name: "slug", type: "string" },
        { name: "created_by", type: "string" },
      ],
    }),
    tableSchema({
      name: "messages",
      columns: [
        { name: "id", type: "number" },
        { name: "messages", type: "string" },
        { name: "inserted_at", type: "string" },
        { name: "user_id", type: "string" },
        { name: "channel_id", type: "number" },
      ],
    }),
    tableSchema({
      name: "role_permissions",
      columns: [
        { name: "id", type: "number" },
        { name: "role", type: "string" },
        { name: "permission", type: "string" },
      ],
    }),
    tableSchema({
      name: "user_roles",
      columns: [
        { name: "id", type: "number" },
        { name: "user_id", type: "string" },
        { name: "role", type: "string" },
      ],
    }),
    tableSchema({
      name: "users",
      columns: [
        { name: "id", type: "string" },
        { name: "username", type: "string" },
        { name: "status", type: "string" },
      ],
    }),
  ],
});
