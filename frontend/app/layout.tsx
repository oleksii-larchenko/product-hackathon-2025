import { Providers } from "@/lib/Providers";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
					rel="stylesheet"
				/>
				<title>Veteran Business Platform</title>
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
