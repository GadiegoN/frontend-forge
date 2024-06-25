import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { ThemeProvider } from "@/components/theme-provider"

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}