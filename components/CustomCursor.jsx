"use client";
import { useEffect, useState } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    let mouseX = 0,
      mouseY = 0;
    let requestId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const smoothFollow = () => {
      setCursorPos((prev) => ({
        x: prev.x + (mouseX - prev.x) * 0.15,
        y: prev.y + (mouseY - prev.y) * 0.15,
      }));
      requestId = requestAnimationFrame(smoothFollow);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleLinkEnter = () => setIsLinkHovered(true);
    const handleLinkLeave = () => setIsLinkHovered(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", handleLinkEnter);
      el.addEventListener("mouseleave", handleLinkLeave);
    });

    smoothFollow();

    return () => {
      cancelAnimationFrame(requestId);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className={styles.cursorContainer}>
      <div
        className={`${styles.cursorOuter} ${
          isLinkHovered ? styles.linkHovered : ""
        } ${isClicked ? styles.clicked : ""}`}
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
        }}
      />
      <div
        className={`${styles.cursorInner} ${
          isClicked ? styles.innerClicked : ""
        }`}
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
        }}
      />
    </div>
  );
}
