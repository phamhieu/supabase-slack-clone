import { useDatabase } from "@nozbe/watermelondb/hooks";
import { useRouter } from "next/router";
import { useContext } from "react";
import UserContext from "lib/UserContext";
import ChannelMenuItem from "components/ChannelMenuItem";

export default function Layout({ channels, activeChannelId, children }) {
  const { signOut, user } = useContext(UserContext);
  const database = useDatabase();
  const router = useRouter();
  const userRoles = [];

  const newChannel = async () => {
    const slug = prompt("Please enter channel name");
    if (slug) {
      const newChannel = await database.write(() =>
        database.get("channels").create((channel) => {
          channel.slug = slugify(slug);
          channel.created_by = user.id;
          channel.insertedAt = Date.now();
        })
      );
      router.push(`/channels/${newChannel.id}`);
    }
  };

  return (
    <main className="main flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <nav
        className="w-64 bg-gray-900 text-gray-100 overflow-scroll "
        style={{ maxWidth: "20%", minWidth: 150, maxHeight: "100vh" }}
      >
        <div className="p-2 ">
          <div className="p-2">
            <button
              className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded w-full transition duration-150"
              onClick={() => newChannel()}
            >
              New Channel
            </button>
          </div>
          <hr className="m-2" />
          <div className="p-2 flex flex-col space-y-2">
            <h6 className="text-xs">{user?.email}</h6>
            <button
              className="bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded w-full transition duration-150"
              onClick={() => signOut()}
            >
              Log out
            </button>
          </div>
          <hr className="m-2" />
          <h4 className="font-bold">Channels</h4>
          <ul className="channel-list">
            {channels.map((x) => (
              <ChannelMenuItem
                channel={x}
                key={x.id}
                isActiveChannel={x.id === activeChannelId}
                user={user}
                userRoles={userRoles}
              />
            ))}
          </ul>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 bg-gray-800 h-screen">{children}</div>
    </main>
  );
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}
