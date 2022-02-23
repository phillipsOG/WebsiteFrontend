import React, { useState, useEffect, useRef } from "react";
import './css/cursor.css'

const Cursor = () => {
    const bigCursor = useRef();
    const smallCursor = useRef();
    const requestRef = useRef();
    const prevRef = useRef();
    let [mousePos, setmousePos] = useState({ x: 0, y: 0 });
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    let cursorVisible = useState(false);
    let sizeUp = useState(false);

    /**
     * Mouse Moves
     */
    const onMouseMove = event => {
        const { pageX: x, pageY: y } = event;
        setmousePos({ x, y });
        positionDot(event);
    };
    const onMouseEnter = () => {
        cursorVisible.current = true;
        toggleCursorVisibility();
    };
    const onMouseLeave = () => {
        cursorVisible.current = false;
        toggleCursorVisibility();
    };
    const onMouseDown = () => {
        sizeUp.current = true;
        toggleCursorSize();
    };
    const onMouseUp = () => {
        sizeUp.current = false;
        toggleCursorSize();
    };
    const onResize = event => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    /**
     * Hooks
     */
    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseenter", onMouseEnter);
        document.addEventListener("mouseleave", onMouseLeave);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        window.addEventListener("resize", onResize);
        requestRef.current = requestAnimationFrame(bCursorAnimateline);

        handleLinks();

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseenter", onMouseEnter);
            document.removeEventListener("mouseleave", onMouseLeave);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    let { x, y } = mousePos;
    const winDimensions = { width, height };
    let endX = winDimensions.width / 2;
    let endY = winDimensions.height / 2;

    /**
     * Position Dot (cursor)
     * @param {event}
     */
    const positionDot = (e) => {
        cursorVisible.current = true;
        toggleCursorVisibility();
        // Position the dot
        endX = e.pageX;
        endY = e.pageY;
        smallCursor.current.style.top = endY + "px";
        smallCursor.current.style.left = endX + "px";
    }

    /**
     * Toggle Cursor Visiblity
     */
    const toggleCursorVisibility = () => {
        if (cursorVisible.current) {
            smallCursor.current.style.opacity = 1;
            bigCursor.current.style.opacity = 1;
        } else {
            smallCursor.current.style.opacity = 0;
            bigCursor.current.style.opacity = 0;
        }
    }

    /**
     * Toggle Cursor Size
     */
    const toggleCursorSize = () => {
        if (sizeUp.current) {
            smallCursor.current.style.transform = "translate(-50%, -50%) scale(0)";
            bigCursor.current.style.transform =
                "translate(-50%, -50%) scale(1.3)";
        } else {
            smallCursor.current.style.transform = "translate(-50%, -50%) scale(1)";
            bigCursor.current.style.transform =
                "translate(-50%, -50%) scale(1)";
        }
    }



    const toggleColorChange = () => {
        if (sizeUp.current) {
            smallCursor.current.style.transform = "translate(-50%, -50%) scale(3)";
            bigCursor.current.style.transform =
                "translate(-50%, -50%) scale(0)";
        } else {
            smallCursor.current.style.transform = "translate(-50%, -50%) scale(1)";
            bigCursor.current.style.transform =
                "translate(-50%, -50%) scale(1)";
        }
    }


    /**
     * Handle LInks
     * Applies mouseover/out hooks on all links
     * to trigger cursor animation
     */
    const handleLinks = () => {
        document.querySelectorAll("a").forEach(el => {
            el.addEventListener("mouseover", () => {
                sizeUp.current = true;
                toggleCursorSize();

            });
            el.addEventListener("mouseout", () => {
                sizeUp.current = false;
                toggleCursorSize();
            });
        });

        document.querySelectorAll("h1").forEach(el => {
            el.addEventListener("mouseover", () => {
                sizeUp.current = true;
                toggleColorChange();

            });
            el.addEventListener("mouseout", () => {
                sizeUp.current = false;
                toggleColorChange();
            });
        })


    }

    /**
     * Animate Dot Outline
     * Aniamtes cursor outline with trailing effect.
     * @param {number} time
     */
    const bCursorAnimateline = time => {
        if (prevRef.current !== undefined) {
            x += (endX - x) / 8;
            y += (endY - y) / 8;
            bigCursor.current.style.top = y + "px";
            bigCursor.current.style.left = x + "px";
        }
        prevRef.current = time;
        requestRef.current = requestAnimationFrame(bCursorAnimateline);
    };

    return (
        <>
            <div ref={bigCursor} class="BigCursor" />
            <div ref={smallCursor} class="SmallCursor" />
        </>
    );
}

export default Cursor;




