import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import { supabase } from "lib/Store";
import schema from "model/schema";
import Channel from "model/Channel";
import Message from "model/Message";
import RolePermission from "model/RolePermission";
import User from "model/User";
import UserRole from "model/UserRole";

const adapter = new LokiJSAdapter({
  schema,
  dbName: "supabaseSlackClone",
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [Channel, Message, RolePermission, User, UserRole],
});
