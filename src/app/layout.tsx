import { FilterProvider } from "./lib/FilterContext";
import { MoviesProvider } from "./lib/MoviesContext";
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
            <MoviesProvider>
              {children}
            </MoviesProvider>
          </FilterProvider>
        </UserProvider>
      </body>
    </html>
  );
}
