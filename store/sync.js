import { synchronize } from "@nozbe/watermelondb/sync";

async function watermelonDbSync() {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      console.log(
        "pullChanges: ",
        schemaVersion,
        migration,
        " lastPulledAt: ",
        lastPulledAt
      );
      // pull channels
      const { data: channels } = await supabase.from("channels").select("*");
      // pull messages
      const { data: messages } = await supabase.from("messages").select("*");
      // pull role_permissions
      const { data: role_permissions } = await supabase
        .from("role_permissions")
        .select("*");
      // pull users
      const { data: users } = await supabase.from("users").select("*");
      // pull user_roles
      const { data: user_roles } = await supabase
        .from("user_roles")
        .select("*");

      const changes = {
        channels,
        messages,
        role_permissions,
        users,
        user_roles,
      };
      const timestamp = Date.now();
      return { changes, timestamp };
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      console.log("pushChanges: ", changes, " lastPulledAt: ", lastPulledAt);
      throw new Error("not implemented");
    },
    migrationsEnabledAtVersion: 1,
  });
}
