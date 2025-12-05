import { Editor } from "@tiptap/react";
import { Toggle } from "./ui/toggle";
import { Bold, Heading2, Italic, List, ListOrdered } from "lucide-react";
export default function ToolBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input rounded-sm bg-transparent dark:bg-input/30 px-3 py-2 w-fit flex gap-3">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </Toggle>
    </div>
  );
}
