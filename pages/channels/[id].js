import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { compose } from "recompose";
import withObservables from "@nozbe/with-observables";
import Layout from "~/components/Layout";
import MessageList from "~/components/MessageList";
import MessageInput from "~/components/MessageInput";
import { useRouter } from "next/router";
import { addMessage } from "~/lib/Store";

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

const Channel = ({ channelId, channel }) => {
  console.log("Channel: ", channelId, channel);
  return (
    <div className="relative h-screen">
      <MessageList channel={channel} />
      <div className="p-2 absolute bottom-0 left-0 w-full">
        <MessageInput
          onSubmit={async (text) => addMessage(text, channelId, user.id)}
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
