import type { OverlayImageEditorProps, Theme } from "../..";
import type ImageWindowLoader from "../../common/image-window-loader";
import type { InnerGridCell, Rectangle, Item } from "../data-grid-types";

export type HoverInfo = readonly [Item, readonly [number, number]];

type ImageEditorType = React.ComponentType<OverlayImageEditorProps>;

export interface BaseDrawArgs {
    ctx: CanvasRenderingContext2D;
    theme: Theme;
    col: number;
    row: number;
    x: number;
    y: number;
    w: number;
    h: number;
    highlighted: boolean;
    hoverAmount: number;
    hoverX: number | undefined;
    hoverY: number | undefined;
    imageLoader: ImageWindowLoader;
}

interface DrawArgs<T extends InnerGridCell> extends BaseDrawArgs {
    cell: T;
}

type DrawCallback<T extends InnerGridCell> = (args: DrawArgs<T>) => void;
type PrepCallback = (args: BaseDrawArgs) => void;

type ProvideEditorCallback<T extends InnerGridCell> = (
    cell: T
) =>
    | React.FunctionComponent<{
          readonly onChange: (newValue: T) => void;
          readonly onKeyDown: (event: React.KeyboardEvent) => void;
          readonly onFinishedEditing: (newValue?: T) => void;
          readonly isHighlighted: boolean;
          readonly value: T;
          readonly imageEditorOverride?: ImageEditorType;
          readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
          readonly target: Rectangle;
          readonly forceEditMode: boolean;
      }>
    | undefined;

export interface InternalCellRenderer<T extends InnerGridCell> {
    readonly kind: T["kind"];
    readonly renderPrep?: PrepCallback;
    readonly render: DrawCallback<T>;
    readonly needsHover: boolean;
    readonly needsHoverPosition: boolean;
    readonly useLabel?: boolean;
    readonly onClick?: (cell: T, posX: number, posY: number, bounds: Rectangle) => T | undefined;
    readonly onDelete?: (cell: T) => T | undefined;
    readonly getAccessibilityString: (cell: T) => string;
    readonly getEditor?: ProvideEditorCallback<T>;
}
