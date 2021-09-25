import { useContext } from "react";
import { useRouter } from "next/router";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { compose } from "recompose";
import withObservables from "@nozbe/with-observables";
import Layout from "~/components/Layout";
import MessageList from "~/components/MessageList";
import MessageInput from "~/components/MessageInput";
import UserContext from "lib/UserContext";

const ChannelDetailPage = ({ channels }) => {
  const router = useRouter();
  const { id: channelId } = router.query;

  // Render the channels and messages
  return (
    <Layout channels={channels} activeChannelId={channelId}>
      {channelId && <EnhanceChannel channelId={channelId} />}
    </Layout>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({ database }) => ({
    channels: database.get("channels").query(),
  }))
)(ChannelDetailPage);

const Channel = ({ channel }) => {
  const { user } = useContext(UserContext);
  const database = useDatabase();

  return (
    <div className="relative h-screen">
      <MessageList channel={channel} />
      <div className="p-2 absolute bottom-0 left-0 w-full">
        <MessageInput
          onSubmit={(text) => {
            database.write(() =>
              database.get("messages").create((message) => {
                message.message = text;
                message.channelId = channel.id;
                message.userId = user.id;
                message.insertedAt = Date.now();
              })
            );
          }}
        />
      </div>
    </div>
  );
};
const EnhanceChannel = compose(
  withDatabase,
  withObservables(["channelId"], ({ channelId, database }) => ({
    channel: database.get("channels").findAndObserve(channelId),
  }))
)(Channel);
