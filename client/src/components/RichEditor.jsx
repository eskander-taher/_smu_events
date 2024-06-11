import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

export default function RichEditor({ description, setDescription }) {
	const editor = useRef(null);

	return (
		<JoditEditor
			ref={editor}
			value={description}
			tabIndex={1}
			onBlur={setDescription}
			onChange={setDescription}
		/>
	);
}
