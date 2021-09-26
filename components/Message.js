import { useContext } from "react";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import withObservables from "@nozbe/with-observables";
import UserContext from "lib/UserContext";
import TrashIcon from "components/TrashIcon";

const Message = ({ message, author }) => {
  const { user } = useContext(UserContext);
  const database = useDatabase();
  const userRoles = [];

  async function onDelete() {
    await database.write(async () => message.destroyPermanently());
  }

  return (
    <div className="py-1 flex items-center space-x-2">
      <div className="text-gray-100 w-4">
        {(user?.id === message.userId ||
          userRoles.some((role) => ["admin", "moderator"].includes(role))) && (
          <button onClick={onDelete}>
            <TrashIcon />
          </button>
        )}
      </div>
      <div>
        <p className="text-blue-700 font-bold">{author.username}</p>
        <p className="text-white">{message.message}</p>
      </div>
    </div>
  );
};

const enhance = withObservables(["message"], ({ message }) => ({
  message, // shortcut syntax for `comment: comment.observe()`
  author: message.author, // shortcut syntax for `message.author.observe()`
}));
const EnhancedMessage = enhance(Message);
export default EnhancedMessage;
