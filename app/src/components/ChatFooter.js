import { MicRounded, Send } from "@mui/icons-material";

export default function ChatFooter({
  input,
  onChange,
  user,
  room,
  roomId,
  sendMessage,
}) {
  const canRecord = true;
  const canSendMessage = input.trim();
  const recordIcons = (
    <>
      <Send style={{ width: 20, height: 20, color: "white" }}></Send>
      <MicRounded
        style={{ width: 24, height: 24, color: "white" }}
      ></MicRounded>
    </>
  );
  return (
    <div className="w-full bottom-4 mb-3">
      <form className="px-4">
        <input
          className="w-full h-12 p-2 bg-neutral-50 outline-black border-2 rounded-md"
          value={input}
          onChange={onChange}
          placeholder="Type a message"
        ></input>
        {canRecord ? (
          <button
            type="submit"
            onClick={canSendMessage ? sendMessage : () => null}
            className="send-btn"
          >
            {recordIcons}
          </button>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}
