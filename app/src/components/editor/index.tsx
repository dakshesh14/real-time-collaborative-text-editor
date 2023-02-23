import { randomInt } from "remirror";

import { useCallback } from "react";

import "remirror/styles/all.css";

import * as Y from "yjs";

import { WebrtcProvider } from "y-webrtc";

import { InvalidContentHandler } from "remirror";
import {
  BoldExtension,
  ItalicExtension,
  CalloutExtension,
  CodeBlockExtension,
  CodeExtension,
  HistoryExtension,
  LinkExtension,
  UnderlineExtension,
  HeadingExtension,
  OrderedListExtension,
  ListItemExtension,
  BulletListExtension,
  FontSizeExtension,
  CollaborationExtension,
  YjsExtension,
} from "remirror/extensions";

import {
  Remirror,
  useRemirror,
  EditorComponent,
  OnChangeJSON,
} from "@remirror/react";
import Spinner from "../spinner";

export interface Props {
  userId: string;
}

const ydoc = new Y.Doc();
const provider = new WebrtcProvider("my-room", ydoc, {
  signaling: ["ws://localhost:8000/ws/editor/my-room/"],
});

const Editor: React.FC = () => {
  // remirror error handler
  const onError: InvalidContentHandler = useCallback(
    ({ json, invalidContent, transformers }: any) => {
      // Automatically remove all invalid nodes and marks.
      return transformers.remove(json, invalidContent);
    },
    []
  );

  // remirror manager
  const { manager, state, onChange } = useRemirror({
    extensions: () => [
      new BoldExtension(),
      new ItalicExtension(),
      new UnderlineExtension(),
      new HeadingExtension({ levels: [1, 2, 3] }),
      new FontSizeExtension({ defaultSize: "16", unit: "px" }),
      new OrderedListExtension(),
      new ListItemExtension(),
      new BulletListExtension({ enableSpine: true }),
      new CalloutExtension({ defaultType: "warn" }),
      new CodeBlockExtension(),
      new CodeExtension(),
      new HistoryExtension(),
      new LinkExtension({ autoLink: true }),
      // TODO: this takes care for Collaboration using CRDT?
      new CollaborationExtension({
        clientID: `user-${randomInt(1000)}`,
      }),
      new YjsExtension({
        getProvider: () => provider,
      }),
    ],
    content: "",
    selection: "start",
    stringHandler: "html",
    onError,
  });

  if (!provider.connected)
    return (
      <div className="w-full h-full flex gap-y-5 flex-col items-center justify-center">
        <Spinner />
        <h2 className="text-2xl">
          Connecting to websocket... (it may not even connect)
        </h2>
        <a href="/">
          <button
            type="button"
            className="p-4 bg-indigo-600 py-2 rounded text-white"
          >
            Reload
          </button>
        </a>
      </div>
    );

  return (
    <div className="mt-2 mb-4">
      <Remirror
        manager={manager}
        initialContent={state}
        classNames={[
          "p-4 focus:outline-none h-96 overflow-y-auto scrollbar-hide",
        ]}
      >
        <div className="rounded-md border">
          <EditorComponent />
          <OnChangeJSON onChange={onChange as any} />
        </div>
      </Remirror>
    </div>
  );
};

export default Editor;
