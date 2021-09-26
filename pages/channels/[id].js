import { useRouter } from "next/router";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { compose } from "recompose";
import withObservables from "@nozbe/with-observables";
import Layout from "components/Layout";
import ChannelDetail from "components/ChannelDetail";

const ChannelDetailPage = ({ channels }) => {
  const router = useRouter();
  const { id: channelId } = router.query;

  return (
    <Layout channels={channels} activeChannelId={channelId}>
      {channelId && <ChannelDetail channelId={channelId} />}
    </Layout>
  );
};

export default compose(
  withDatabase,
  withObservables([], ({ database }) => ({
    channels: database.get("channels").query(),
  }))
)(ChannelDetailPage);
