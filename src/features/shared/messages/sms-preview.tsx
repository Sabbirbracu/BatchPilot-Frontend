import clsx from "clsx";

/** Grey incoming-SMS bubble with the squared bottom-left corner. */
export function SmsBubble({ text, className }: { text: string; className?: string }) {
  return (
    <div className={clsx("rounded-[16px_16px_16px_4px] bg-[#F3F1FA] px-3 py-2.5 text-[13px] leading-[1.6] break-words whitespace-pre-wrap", className)}>
      {text || "…"}
    </div>
  );
}

/** Tall phone mock-up (template page): notch bar, sender, time, bubble. */
export function PhonePreview({ sender, time, text }: { sender: string; time: string; text: string }) {
  return (
    <div className="flex max-h-[330px] w-[220px] flex-1 flex-col rounded-[30px] bg-white px-3 py-3.5 shadow-[0_0_0_1px_#EEE7FC,0_24px_40px_-24px_rgba(46,16,101,.5)]">
      <div className="mx-auto mb-3 h-[5px] w-[46px] rounded-[3px] bg-[#ECE8F6]" />
      <p className="m-0 truncate text-center text-[11px] font-bold text-[#17161F] uppercase">{sender}</p>
      <p className="m-0 mb-3 text-center text-[10px] text-[#6B6880]">{time}</p>
      <div className="min-h-0 overflow-y-auto">
        <SmsBubble text={text} />
      </div>
    </div>
  );
}

/** Compact preview card (notice page): sender · time over the bubble. */
export function MessageCardPreview({ sender, time, text }: { sender: string; time: string; text: string }) {
  return (
    <div className="rounded-[22px] bg-white p-3 shadow-[0_18px_30px_-18px_rgba(46,16,101,.4)]">
      <p className="m-0 mb-2 truncate text-center text-[11px] text-[#6B6880]">
        {sender.toUpperCase()} · {time}
      </p>
      <SmsBubble text={text} />
    </div>
  );
}
