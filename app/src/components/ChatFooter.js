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
    <div className="absolute w-full bottom-4 ">
      <form className="px-4">
        <input
          className="w-[77%]"
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
