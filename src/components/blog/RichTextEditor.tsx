'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { useCallback } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing your post...'
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-gold hover:text-gold-dark underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    const url = window.prompt('Enter link URL:');
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 rounded font-bold transition-colors ${
            editor.isActive('bold')
              ? 'bg-navy text-white'
              : 'hover:bg-gray-200 text-charcoal'
          }`}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 rounded italic transition-colors ${
            editor.isActive('italic')
              ? 'bg-navy text-white'
              : 'hover:bg-gray-200 text-charcoal'
          }`}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1.5 rounded line-through transition-colors ${
            editor.isActive('strike')
              ? 'bg-navy text-white'
              : 'hover:bg-gray-200 text-charcoal'
          }`}
          title="Strikethrough"
        >
          S
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1.5 rounded font-semibold transition-colors ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-navy text-white'
              : 'hover:bg-gray-200 text-charcoal'
          }`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1.5 rounded font-semibold transition-colors ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-navy text-white'
              : 'hover:bg-gray-200 text-charcoal'
          }`}
          title="Heading 3"
        >
          H3
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 rounded transition-colors ${
            editor.isActive('bulletList')
              ? 'bg-navy text-white'
              : 'hover:bg-gray-200 text-charcoal'
          }`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 rounded transition-colors ${
            editor.isActive('orderedList')
              ? 'bg-navy text-white'
              : 'hover:bg-gray-200 text-charcoal'
          }`}
          title="Numbered List"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1.5 rounded transition-colors ${
            editor.isActive('blockquote')
              ? 'bg-navy text-white'
              : 'hover:bg-gray-200 text-charcoal'
          }`}
          title="Blockquote"
        >
          &ldquo;&rdquo;
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={addLink}
          className={`px-3 py-1.5 rounded transition-colors ${
            editor.isActive('link')
              ? 'bg-navy text-white'
              : 'hover:bg-gray-200 text-charcoal'
          }`}
          title="Add Link"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={addImage}
          className="px-3 py-1.5 rounded hover:bg-gray-200 text-charcoal transition-colors"
          title="Add Image"
        >
          🖼️
        </button>

        <div className="w-px h-8 bg-gray-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1.5 rounded hover:bg-gray-200 text-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Undo"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1.5 rounded hover:bg-gray-200 text-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Redo"
        >
          ↷
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="prose prose-lg max-w-none p-6 min-h-[400px] focus:outline-none"
      />
    </div>
  );
}
