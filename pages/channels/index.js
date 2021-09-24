import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { compose } from "recompose";
import withObservables from "@nozbe/with-observables";
import Layout from "~/components/Layout";

const ChannelsPage = ({ channels }) => {
  console.log("channels: ", channels);

  // Render the channels and messages
  return <Layout channels={channels}></Layout>;
};

export default compose(
  withDatabase,
  withObservables([], ({ database }) => ({
    channels: database.get("channels").query(),
  }))
)(ChannelsPage);
