import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: 'Blog | %s',
    default: 'Blog',
  },
  description: "Read about how our coworking and coliving space came to be",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
