<script setup lang="ts">
import * as TipTap from "@/component/TipTap";
import GUIEditorButton from "@/component/GUIEditorButton.vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { BubbleMenu } from "@tiptap/vue-3/menus";
import {
  AlignCenter,
  AlignLeft,
  AlignJustify,
  AlignRight,
  Bold,
  Heading,
  Italic,
  List,
  ListOrdered,
  MessageSquare,
  Strikethrough,
  Underline,
} from "lucide-vue-next";

const props = defineProps<{
  content: string | undefined;
}>();
const emit = defineEmits(["onUpdate"]);
const editor = useEditor({
  content: props.content,
  extensions: [
    TipTap.Bold,
    TipTap.BubbleMenuExtension,
    TipTap.BulletList.configure({
      HTMLAttributes: { class: "list-disc mx-4" },
    }),
    TipTap.Blockquote.extend({
      content: "(paragraph)+",
    }).configure({
      HTMLAttributes: {
        class:
          "mb-4 px-8 py-4 bg-[#FAFAFA] border border-l-4 border-l-black border-gray-100 leading-loose [&>p:last-child]:mb-0",
      },
    }),
    TipTap.Document.extend({ content: "block+" }),
    TipTap.Heading.extend({ marks: "" }).configure({
      levels: [2],
      HTMLAttributes: { class: "text-2xl font-medium tracking-tight mt-8 mb-4" },
    }),
    TipTap.History,
    TipTap.Italic,
    TipTap.ListItem.configure({
      HTMLAttributes: { class: "[&>p]:px-0 [&>ol]:mx-4 [&>ul]:mx-4" },
    }),
    TipTap.OrderedList.configure({
      HTMLAttributes: { class: "list-decimal mx-4" },
    }),
    TipTap.Paragraph.configure({
      HTMLAttributes: { class: "mb-4 leading-relaxed text-gray-700" },
    }),
    TipTap.Placeholder.configure({
      showOnlyCurrent: false,
      placeholder(context) {
        if (context.node.type.name === "paragraph") {
          return "What do you have in mind?";
        }

        if (context.node.type.name === "heading") {
          return "What is the name of this section?";
        }

        return "What do you have in mind?";
      },
    }),
    TipTap.Strike,
    TipTap.Text,
    TipTap.TextAlign.configure({
      types: ["paragraph"],
    }),
    TipTap.Underline,
  ],
  editorProps: {
    attributes: {
      id: "tip-tap-editor",
      class: "prose prose-lg max-w-none focus:outline-none min-h-[500px]",
    },
  },
  onUpdate: ({ editor }) => {
    emit("onUpdate", editor.getHTML());
  },
});
</script>

<template>
  <div class="editor-container relative">
    <BubbleMenu
      v-if="editor"
      :editor="editor"
      :tippy-options="{ duration: 150 }"
      class="flex items-center overflow-hidden rounded-lg shadow-2xl bg-gray-900 border border-gray-800 p-1 gap-0.5"
    >
      <GUIEditorButton
        title="Bold"
        :is-active="editor?.isActive('bold')"
        @click="editor?.chain().focus().toggleBold().run()"
      >
        <Bold />
      </GUIEditorButton>
      <GUIEditorButton
        title="Italic"
        :is-active="editor?.isActive('italic')"
        @click="editor?.chain().focus().toggleItalic().run()"
      >
        <Italic />
      </GUIEditorButton>
      <GUIEditorButton
        title="Underline"
        :is-active="editor?.isActive('underline')"
        @click="editor?.chain().focus().toggleUnderline().run()"
      >
        <Underline />
      </GUIEditorButton>
      <GUIEditorButton
        title="Strikethrough"
        :is-active="editor?.isActive('strike')"
        @click="editor?.chain().focus().toggleStrike().run()"
      >
        <Strikethrough />
      </GUIEditorButton>
      <div class="w-[1px] h-4 bg-gray-800 mx-1"></div>
      <GUIEditorButton
        title="Align Left"
        :is-active="editor?.isActive({ textAlign: 'left' })"
        @click="editor?.chain().focus().setTextAlign('left').run()"
      >
        <AlignLeft />
      </GUIEditorButton>
      <GUIEditorButton
        title="Align Center"
        :is-active="editor?.isActive({ textAlign: 'center' })"
        @click="editor?.chain().focus().setTextAlign('center').run()"
      >
        <AlignCenter />
      </GUIEditorButton>
      <GUIEditorButton
        title="Align Right"
        :is-active="editor?.isActive({ textAlign: 'right' })"
        @click="editor?.chain().focus().setTextAlign('right').run()"
      >
        <AlignRight />
      </GUIEditorButton>
      <GUIEditorButton
        title="Justify"
        :is-active="editor?.isActive({ textAlign: 'justify' })"
        @click="editor?.chain().focus().setTextAlign('justify').run()"
      >
        <AlignJustify />
      </GUIEditorButton>
      <div class="w-[1px] h-4 bg-gray-800 mx-1"></div>
      <GUIEditorButton
        title="Heading"
        :is-active="editor?.isActive('heading', { level: 2 })"
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <Heading />
      </GUIEditorButton>
      <GUIEditorButton
        title="Bullet List"
        :is-active="editor?.isActive('bulletList')"
        @click="editor?.chain().focus().toggleBulletList().run()"
      >
        <List />
      </GUIEditorButton>
      <GUIEditorButton
        title="Ordered List"
        :is-active="editor?.isActive('orderedList')"
        @click="editor?.chain().focus().toggleOrderedList().run()"
      >
        <ListOrdered />
      </GUIEditorButton>
      <GUIEditorButton
        title="Quote"
        :is-active="editor?.isActive('blockquote')"
        @click="editor?.chain().focus().toggleBlockquote().run()"
      >
        <MessageSquare />
      </GUIEditorButton>
    </BubbleMenu>
    <EditorContent :editor="editor" />
  </div>
</template>

<style>
#tip-tap-editor h2.is-empty:before,
p.is-empty:before {
  --uno: "float-left h-0 text-gray-400 pointer-events-none content-[attr(data-placeholder)]";
}
</style>
