import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import { supabase } from "lib/Store";
import Channel from "model/Channel";
import Message from "model/Message";
import RolePermission from "model/RolePermission";
import User from "model/User";
import UserRole from "model/UserRole";

const adapter = new LokiJSAdapter({
  schema,
  // (You might want to comment out migrations for development purposes -- see Migrations documentation)
  migrations,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  // dbName: 'myapp', // optional db name

  // --- Optional, but recommended event handlers:

  onQuotaExceededError: (error) => {
    // Browser ran out of disk space -- offer the user to reload the app or log out
  },
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
  },
  extraIncrementalIDBOptions: {
    onDidOverwrite: () => {
      // Called when this adapter is forced to overwrite contents of IndexedDB.
      // This happens if there's another open tab of the same app that's making changes.
      // Try to synchronize the app now, and if user is offline, alert them that if they close this
      // tab, some data may be lost
    },
    onversionchange: () => {
      // database was deleted in another browser tab (user logged out), so we must make sure we delete
      // it in this tab as well - usually best to just refresh the page
      if (checkIfUserIsLoggedOut()) {
        window.location.reload();
      }
    },
  },
});

function checkIfUserIsLoggedOut() {
  const session = supabase.auth.session();
  return !session.user;
}

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [Channel, Message, RolePermission, User, UserRole],
});
