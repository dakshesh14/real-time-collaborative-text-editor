import { forwardRef, useCallback, useImperativeHandle } from "react";

import "remirror/styles/all.css";

import * as Y from "yjs";

import { WebrtcProvider } from "y-webrtc";

import { Extension, InvalidContentHandler } from "remirror";
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
  ReactFrameworkOutput,
} from "@remirror/react";

export interface Props {
  onChange: (value: any) => void;
  value?: any;
}

const ydoc = new Y.Doc();
// use my server
const provider = new WebrtcProvider("my-room", ydoc, {
  signaling: ["ws://localhost:8000/ws/editor/my-room/"],
});

export const extensions = () => [
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
    clientID: `client-${Math.random()}`,
  }),
  new YjsExtension({
    getProvider: () => provider,
  }),
];

const EditorWithRef = forwardRef<ReactFrameworkOutput<Extension>, Props>(
  (props, ref) => {
    const { onChange, value } = props;

    // remirror error handler
    const onError: InvalidContentHandler = useCallback(
      ({ json, invalidContent, transformers }: any) => {
        // Automatically remove all invalid nodes and marks.
        return transformers.remove(json, invalidContent);
      },
      []
    );

    // remirror manager
    const { manager, state, getContext } = useRemirror({
      extensions,
      content: value,
      selection: "start",
      stringHandler: "html",
      onError,
    });

    useImperativeHandle(ref, () => getContext() as any, [getContext]);

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
            <OnChangeJSON onChange={onChange} />
          </div>
        </Remirror>
      </div>
    );
  }
);

export default EditorWithRef;
