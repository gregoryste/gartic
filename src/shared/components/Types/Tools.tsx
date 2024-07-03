export type ITools = {
    settings: ISettings[] | any;
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
}