import React from "react";

interface MarkdownNode {
	type: "text" | "bold" | "italic" | "lineBreak";
	content: string;
}

const parseMarkdown = (text: string): MarkdownNode[] => {
	const nodes: MarkdownNode[] = [];
	let i = 0;

	while (i < text.length) {
		if (i + 1 < text.length && text[i] === "*" && text[i + 1] === "*") {
			const endIndex = text.indexOf("**", i + 2);
			if (endIndex !== -1) {
				nodes.push({
					type: "bold",
					content: text.substring(i + 2, endIndex),
				});
				i = endIndex + 2;
				continue;
			}
		}

		if (text[i] === "*" && (i + 1 >= text.length || text[i + 1] !== "*")) {
			const endIndex = text.indexOf("*", i + 1);
			if (endIndex !== -1 && (endIndex + 1 >= text.length || text[endIndex + 1] !== "*")) {
				nodes.push({
					type: "italic",
					content: text.substring(i + 1, endIndex),
				});
				i = endIndex + 1;
				continue;
			}
		}

		if (text[i] === "\n") {
			nodes.push({ type: "lineBreak", content: "" });
			i++;
			continue;
		}

		let textStart = i;
		while (
			i < text.length &&
			text[i] !== "\n" &&
			!(i + 1 < text.length && text[i] === "*" && text[i + 1] === "*") &&
			!(text[i] === "*" && (i + 1 >= text.length || text[i + 1] !== "*"))
		) {
			i++;
		}
		if (i > textStart) {
			nodes.push({
				type: "text",
				content: text.substring(textStart, i),
			});
		}
	}

	return nodes;
};

export const renderMarkdown = (text: string): React.ReactNode => {
	const nodes = parseMarkdown(text);
	return nodes.map((node, index) => {
		switch (node.type) {
			case "bold":
				return <strong key={index}>{node.content}</strong>;
			case "italic":
				return <em key={index}>{node.content}</em>;
			case "lineBreak":
				return <br key={index} />;
			case "text":
			default:
				return <React.Fragment key={index}>{node.content}</React.Fragment>;
		}
	});
};

