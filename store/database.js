import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import schema from "model/schema";
import migrations from "model/migrations";
import Channel from "model/Channel";
import Message from "model/Message";
import RolePermission from "model/RolePermission";
import User from "model/User";
import UserRole from "model/UserRole";

const adapter = new LokiJSAdapter({
  schema,
  migrations,
  dbName: "supabaseSlackClone",
  useWebWorker: false,
  useIncrementalIndexedDB: true,
});

export const databaseConfig = {
  adapter,
  modelClasses: [Channel, Message, RolePermission, User, UserRole],
};
