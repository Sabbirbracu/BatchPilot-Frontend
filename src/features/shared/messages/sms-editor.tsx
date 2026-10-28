"use client";

import clsx from "clsx";
import { useEffect, useImperativeHandle, useRef } from "react";
import { VARS } from "./vars";

export type SmsEditorHandle = { insertVar: (key: string) => void };

const LOOK = {
  // Template page: white box with a violet focus ring, larger type.
  template: {
    box: "rounded-[16px] bg-white p-4 text-[16px] leading-[1.9] min-h-[120px] shadow-[inset_0_0_0_2px_#8B5CF6,0_0_0_5px_#F1EAFF]",
    chip: "rounded-[5px] bg-[#F4EEFF] px-1 font-bold text-[#5B21B6]",
  },
  // Notice page: soft box with a thin lavender ring.
  notice: {
    box: "rounded-[16px] bg-[#FAF9FD] p-3.5 text-[15px] leading-[1.7] min-h-[96px] shadow-[inset_0_0_0_1.5px_#C9B3FF] focus:shadow-[inset_0_0_0_2px_#8B5CF6]",
    chip: "rounded-[6px] bg-[#F4EEFF] px-[5px] font-bold text-[#5B21B6]",
  },
};

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * SMS text box where placeholders show as purple chips ("নাম") instead of raw "{student}".
 * `value` / `onChange` use the stored form with English keys; chips are atomic (deleted whole).
 */
export function SmsEditor({
  value,
  onChange,
  look = "template",
  braces,
  placeholder,
  label,
  readOnly,
  ref,
}: {
  value: string;
  onChange: (stored: string) => void;
  look?: keyof typeof LOOK;
  braces?: boolean; // show "{ব্যাচ}" rather than "ব্যাচ" inside the chip
  placeholder?: string;
  label: string;
  readOnly?: boolean;
  ref?: React.Ref<SmsEditorHandle>;
}) {
  const el = useRef<HTMLDivElement>(null);
  const emitted = useRef<string | null>(null);
  const l = LOOK[look];

  const chipHtml = (key: string) => {
    const v = VARS[key];
    const name = braces ? (v?.long ?? v?.bn ?? key) : (v?.bn ?? key);
    return `<span contenteditable="false" data-var="${key}" class="${l.chip}">${braces ? `{${name}}` : name}</span>`;
  };

  // Only rebuild the DOM for outside changes (template picked, reset); typing keeps the caret.
  useEffect(() => {
    if (!el.current || value === emitted.current) return;
    el.current.innerHTML = escape(value)
      .replace(/\{([a-z_]+)\}/g, (m, k) => (VARS[k] ? chipHtml(k) : m))
      .replace(/\n/g, "<br>");
    emitted.current = value;
    // chipHtml depends only on look/braces, which do not change for a mounted editor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function emit() {
    if (!el.current) return;
    const v = serialize(el.current).replace(/ /g, " ");
    emitted.current = v;
    onChange(v);
  }

  useImperativeHandle(ref, () => ({
    insertVar(key: string) {
      const box = el.current;
      if (!box) return;
      box.focus();
      const sel = window.getSelection();
      let range = sel && sel.rangeCount ? sel.getRangeAt(0) : null;
      if (!range || !box.contains(range.commonAncestorContainer)) {
        range = document.createRange();
        range.selectNodeContents(box);
        range.collapse(false);
      }
      const holder = document.createElement("span");
      holder.innerHTML = chipHtml(key);
      const chip = holder.firstChild as HTMLElement;
      range.deleteContents();
      range.insertNode(chip);
      // An empty text node after the chip gives the caret somewhere to sit, so "-এর" can follow directly.
      const after = document.createTextNode("");
      chip.after(after);
      range.setStart(after, 0);
      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
      emit();
    },
  }));

  return (
    <div
      ref={el}
      role="textbox"
      aria-multiline
      aria-label={label}
      contentEditable={!readOnly}
      aria-readonly={readOnly}
      suppressContentEditableWarning
      data-placeholder={placeholder}
      onInput={emit}
      onPaste={(e) => {
        e.preventDefault();
        document.execCommand("insertText", false, e.clipboardData.getData("text/plain"));
      }}
      className={clsx(
        "break-words whitespace-pre-wrap text-[#17161F] outline-none empty:before:text-[#9E9BAD] empty:before:content-[attr(data-placeholder)]",
        l.box,
      )}
    />
  );
}

function serialize(node: Node): string {
  let out = "";
  node.childNodes.forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) out += n.textContent ?? "";
    else if (n instanceof HTMLElement) {
      if (n.dataset.var) out += `{${n.dataset.var}}`;
      else if (n.tagName === "BR") out += "\n";
      else {
        if (n.tagName === "DIV" && out && !out.endsWith("\n")) out += "\n";
        out += serialize(n);
      }
    }
  });
  return out;
}
