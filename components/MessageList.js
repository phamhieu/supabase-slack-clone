import { useEffect, useRef } from "react";
import withObservables from "@nozbe/with-observables";
import Message from "components/Message";

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="Messages h-full pb-16">
      <div className="p-2 overflow-y-auto">
        {messages.map((x) => (
          <Message key={x.id} message={x} />
        ))}
        <div ref={messagesEndRef} style={{ height: 0 }} />
      </div>
    </div>
  );
};

const enhance = withObservables(["channel"], ({ channel }) => ({
  messages: channel.messages,
}));
const EnhancedMessageList = enhance(MessageList);
export default EnhancedMessageList;
