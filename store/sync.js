import SyncLogger from "@nozbe/watermelondb/sync/SyncLogger";
import { synchronize } from "@nozbe/watermelondb/sync";
import { supabase } from "lib/Store";

const logger = new SyncLogger(10 /* limit of sync logs to keep in memory */);

export async function watermelonDbSync(database) {
  try {
    if (!database) throw new Error("database obj is undefined");

    await synchronize({
      database,
      log: logger.newLog(),
      pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
        console.log(
          "pullChanges: ",
          schemaVersion,
          migration,
          " lastPulledAt: ",
          lastPulledAt
        );

        if (!lastPulledAt) {
          return await pullInitialData();
        } else {
          // TODO: pull changes from lastPulledAt
          throw new Error("not implemented");
        }
      },
      pushChanges: async ({ changes, lastPulledAt }) => {
        console.log("pushChanges: ", changes, " lastPulledAt: ", lastPulledAt);
        if (lastPulledAt) {
          throw new Error("not implemented");
        }
      },
      migrationsEnabledAtVersion: 1,
    });
  } catch (e) {
    console.log(e);
  } finally {
    console.log("watermelonDbSync formattedLogs: ", logger.formattedLogs);
  }
}

async function pullInitialData() {
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
  const { data: user_roles } = await supabase.from("user_roles").select("*");

  const changes = {
    channels: { created: channels, updated: [], deleted: [] },
    messages: { created: messages, updated: [], deleted: [] },
    role_permissions: {
      created: role_permissions,
      updated: [],
      deleted: [],
    },
    users: { created: users, updated: [], deleted: [] },
    user_roles: { created: user_roles, updated: [], deleted: [] },
  };
  //TODO: need to get current server time
  const timestamp = Date.now();
  console.log("pullInitialData completed: ", timestamp, changes);
  return { changes, timestamp };
}
