import { useContext } from "react";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { compose } from "recompose";
import withObservables from "@nozbe/with-observables";
import MessageList from "~/components/MessageList";
import MessageInput from "~/components/MessageInput";
import UserContext from "lib/UserContext";

const ChannelDetail = ({ channel }) => {
  const { user } = useContext(UserContext);
  const database = useDatabase();

  function onCreateMessage(text) {
    database.write(() =>
      database.get("messages").create((message) => {
        message.message = text;
        message.channelId = channel.id;
        message.userId = user.id;
        message.insertedAt = Date.now();
      })
    );
  }

  return (
    <div className="relative h-screen">
      <MessageList channel={channel} />
      <div className="p-2 absolute bottom-0 left-0 w-full">
        <MessageInput onSubmit={onCreateMessage} />
      </div>
    </div>
  );
};
const EnhanceChannelDetail = compose(
  withDatabase,
  withObservables(["channelId"], ({ channelId, database }) => ({
    channel: database.get("channels").findAndObserve(channelId),
  }))
)(ChannelDetail);

export default EnhanceChannelDetail;
