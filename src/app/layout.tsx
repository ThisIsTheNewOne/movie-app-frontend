import { FilterProvider } from "./lib/FilterContext";
import { UserProvider } from "./lib/UserContext";
import "./ui/global.css";
import { roboto } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        <UserProvider>
          <FilterProvider>
          {children}
          </FilterProvider>
        </UserProvider>
      </body>
    </html>
  );
}
