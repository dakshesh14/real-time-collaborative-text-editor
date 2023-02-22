import { forwardRef, useCallback, useImperativeHandle } from "react";

import "remirror/styles/all.css";

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
          classNames={["p-4 focus:outline-none"]}
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
