import Link from "next/link";
import withObservables from "@nozbe/with-observables";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useRouter } from "next/router";
import TrashIcon from "components/TrashIcon";

const ChannelMenuItem = ({ channel, isActiveChannel, user, userRoles }) => {
  const database = useDatabase();
  const router = useRouter();

  return (
    <li className="flex items-center justify-between">
      <Link href="/channels/[id]" as={`/channels/${channel.id}`}>
        <a className={isActiveChannel ? "font-bold" : ""}>{channel.slug}</a>
      </Link>
      {channel.id !== 1 &&
        (channel.created_by === user?.id || userRoles.includes("admin")) && (
          <button
            onClick={async () => {
              await database.write(async () => channel.markAsDeleted());
              if (router.asPath.includes(channel.id)) {
                // redirect to channels, if route is at deleted channel
                router.push("/channels");
              }
            }}
          >
            <TrashIcon />
          </button>
        )}
    </li>
  );
};

const enhance = withObservables(["channel"], ({ channel }) => ({
  channel,
}));
const EnhancedChannelMenuItem = enhance(ChannelMenuItem);

export default EnhancedChannelMenuItem;
