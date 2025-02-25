import React, { useRef, useEffect, useState, useContext } from 'react';
import "../../../styles/dashboard.modules.scss";
import { SocketContext } from '../../hooks/context/socket';

interface MyBoard {
    color: string;
    size: number;
    clear: boolean;
    setClear: any;
    editor: boolean;
    eraser: boolean;
}

const Board: React.FC<MyBoard> = (props) => {
    const socket = useContext(SocketContext);
    const { color, size, clear, setClear, editor, eraser } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dashboardRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeigth] = useState(0);

    const clearBoard = () => {
        const canvas = canvasRef.current;
        if (!canvas) return

        const ctx = canvas.getContext('2d');
        if (!ctx) return
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    useEffect(() => {
        if (socket) {
            socket.on('renderImage', (data) => {
                if(data.id === socket.id) return;

                if(data.clear){
                    clearBoard();
                    return;
                }

                const image = new Image();
                image.src = data.image;
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                image.onload = () => {
                    ctx.drawImage(image, 0, 0);
                };
            });
        }
    }, [socket]);


    useEffect(() => {
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        const startDrawing = (e: { offsetX: number; offsetY: number; }) => {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        const draw = (e: { offsetX: number; offsetY: number; }) => {
            if (!isDrawing) return;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }

            if(eraser){
                ctx.strokeStyle = "white";
            }

            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        const endDrawing = () => {
            const canvas = canvasRef.current;
            const dataURL = canvas.toDataURL();

            if (socket) {
                socket.emit('canvasImage', {image: dataURL, clear: false, id: socket.id});
            }
            isDrawing = false;
        };

        const canvas: HTMLCanvasElement | null = canvasRef.current;
        const ctx = canvasRef.current?.getContext('2d');

        if (ctx) {
            ctx.strokeStyle = color;
            ctx.lineWidth = size;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }

        if(clear){
            clearBoard();

            const dataURL = canvas.toDataURL();

            if (socket) {
                socket.emit('canvasImage', {image: dataURL, clear: true, id: socket.id});
            }
            isDrawing = false;
            
            setClear(false);
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mouseout', endDrawing);

        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mouseout', endDrawing);
        };
    }, [color, size, socket, eraser, clear]);

    useEffect(() => {
        const updateDimensions = () => {
            if (dashboardRef.current) {
                setWidth(dashboardRef.current.offsetWidth)
                setHeigth(dashboardRef.current.offsetHeight - 50)
            }
        };

        updateDimensions();

        window.addEventListener('resize', updateDimensions);
    }, []);

    return (
        <>
                <canvas
                    ref={canvasRef}
                    width={width}
                    height={height}
                    className={!editor ? "dashboard dashboard--hidden" : "dashboard" }
                />

                {!editor ? (
                    <div className="dashboard__image-hidden"></div>
                ) : ""}
                <div ref={dashboardRef} className="dashboard dashboard--dimensions"></div>
        </>

    );
};

export { Board };
