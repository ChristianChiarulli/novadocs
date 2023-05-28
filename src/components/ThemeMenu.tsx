import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { ComputerDesktopIcon } from "@heroicons/react/24/solid";

const themes = ["light", "dark", "system"];

export default function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("");

  const openPopup = () => {
    setIsOpen(true);
  };

  const switchTheme = (theme: string) => {
    if (theme === "light") {
      setTheme("light");
      localStorage.theme = "light";
    }
    if (theme === "dark") {
      setTheme("dark");
      localStorage.theme = "dark";
    }
    if (theme === "system") {
      setTheme("system");
      localStorage.removeItem("theme");
    }
  };

  useEffect(() => {
    console.log("theme test", theme)
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, [theme]);

  return (
    <>
      <button className="hidden lg:block" onClick={openPopup}>
        {theme === "light" ? (
          <SunIcon className="h-6 w-6 text-orange-500" aria-hidden="true" />
        ) : (
          <MoonIcon className="h-6 w-6 text-purple-500" aria-hidden="true" />
        )}
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="max-w-2xl relative z-40"
      >
        <div className="fixed z-50 inset-0 lg:block">
          <Dialog.Panel className="fixed top-20 right-16 max-w-xs bg-white dark:bg-zinc-800 rounded-lg shadow-lg p-2 text-base font-semibold border border-zinc-300 dark:border-zinc-700">
            <ul className="flex flex-col gap-2">
              {themes.map((theme) => (
                <li key={theme}>
                  <button
                    key={theme}
                    onClick={() => {
                      switchTheme(theme);
                      if (theme === "system") {
                        localStorage.removeItem("theme");
                      } else localStorage.setItem("theme", theme);
                      setIsOpen(false);
                    }}
                    className="block font-semibold rounded-md w-full"
                  >
                    <span className="flex gap-3 hover:bg-zinc-200 dark:hover:bg-zinc-700 w-full p-2 rounded-md">
                      {theme === "light" && (
                        <SunIcon
                          className="h-6 w-6 text-orange-500"
                          aria-hidden="true"
                        />
                      )}
                      {theme === "dark" && (
                        <MoonIcon
                          className="h-6 w-6 text-purple-500"
                          aria-hidden="true"
                        />
                      )}
                      {theme === "system" && (
                        <ComputerDesktopIcon
                          className="h-6 w-6 text-zinc-500"
                          aria-hidden="true"
                        />
                      )}

                      {theme}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
