import React, { useEffect, useState } from "react";

interface TypewriterTextProps {
    textArray: string[];
    speed?: number;
    delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ textArray = [
    "Fashion",
    "Internships",
    "Travels",
    "Lifestyle",
    "Events",
], speed = 60, delay = 1200 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const currentText = textArray[textIndex];

        if (!isDeleting && charIndex < currentText.length) {
            timeout = setTimeout(() => {
                setDisplayedText(currentText.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, speed);
        } else if (!isDeleting && charIndex === currentText.length) {
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, delay);
        } else if (isDeleting && charIndex > 0) {
            timeout = setTimeout(() => {
                setDisplayedText(currentText.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            }, speed / 2);
        } else if (isDeleting && charIndex === 0) {
            timeout = setTimeout(() => {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % textArray.length);
            }, speed);
        }
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, textIndex, textArray, speed, delay]);

    return (
        <span style={{ display: "block" }}>
            {displayedText}
            <span className="animate-blink">|</span>
        </span>
    );
};

export default TypewriterText;
