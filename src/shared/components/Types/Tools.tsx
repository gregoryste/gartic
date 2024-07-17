export type ITools = {
    settings: ISettings;
    editor: boolean;
}

export type ISettings = {
    color?: string;
    setColor?: (e) => void;
    lineWidth?: string;
    setLineWidth?: (e) => void;
    clearBoard?: boolean;
    setClearBoard?: (e) => void;
    editor?: boolean;
    eraser?: boolean;
    setEraser?: (e) => void | undefined;
    popup?: boolean;
    setPopup?: (e) => void;
    word?: string
}