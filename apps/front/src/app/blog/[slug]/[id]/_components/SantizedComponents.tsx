

"use client";

import DOMPurify from "dompurify";
type Props = {
    content: string;
    className?: string;
};

export default function SantizedComponents(props: Props) {
    // const cleanHtml = DOMPurify.sanitize(props.content);

    return (
        <div
            className={props.className}
            dangerouslySetInnerHTML={{ __html: props.content }}
        />
    );
}
