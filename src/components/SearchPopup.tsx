import { useEffect, useState } from "react";
import {
  DocumentTextIcon,
  HashtagIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Combobox } from "@headlessui/react";

export default function SearchPopup({
  isOpen,
  closePopup,
  setIsOpen,
  query,
  setQuery,
  posts,
}: any) {
  const [transformedContent, setTransformedContent] = useState([]);

  function transformContent(contentArray: any) {
    return contentArray.reduce((newArray: any, post: any) => {
      // const matches = post.matches;
      // can get key with paragraph, header, or title and add it to the object
      // const score = post.score;
      // const refIndex = post.refIndex;
      // Try to find an existing object with the same title
      let item = post.item;
      let existingObj = newArray.find((obj: any) => obj.label === item.label);

      if (existingObj) {
        // If an object with the same title exists, try to find a content object with the same header
        let existingContent = existingObj.content.find(
          (content: any) => content.header === item.header
        );

        if (existingContent) {
          // If a content object with the same header exists, append the paragraph to its paragraphs array
          existingContent.paragraphs.push(item.paragraph);
        } else {
          // If no content object with the same header exists, create a new one
          existingObj.content.push({
            header: item.header,
            paragraphs: [item.paragraph],
          });
        }
      } else {
        // If no object with the same title exists, create a new one
        newArray.push({
          label: item.label,
          slug: item.slug,
          content: [
            {
              header: item.header,
              paragraphs: [item.paragraph],
            },
          ],
        });
      }

      return newArray;
    }, []);
  }

  useEffect(() => {
    const transformed = transformContent(posts);
    setTransformedContent(transformed);
  }, [posts]);

  function cleanHeaderLink(header: string) {
    return header
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  function NoResults() {
    return (
      <div className="px-8 pt-12 pb-16 flex font-semibold justify-center items-center">
        <h2 className="text-zinc-500">Nothing to see here</h2>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} className="fixed z-50 top-52" onClose={closePopup}>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="fixed inset-0 p-4 sm:p-8 md:p-28">
        <Dialog.Panel className="border pb-4 border-zinc-300 dark:border-zinc-700 mx-auto rounded-lg max-w-3xl bg-white dark:bg-zinc-800 shadow-3xl overflow-hidden">
          <Combobox
            onChange={(loc: any) => {
              window.location = loc;
              setIsOpen(false);
            }}
          >
            <div className="border-b flex items-center mb-4 border-zinc-300 dark:border-zinc-700">
              <Combobox.Input
                className="w-full text-lg border-none p-8 h-8 focus:ring-0 text-zinc-900 placeholder:text-zinc-400 dark:text-zinc-100 placeholder-zinc-400 bg-transparent"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Type to search..."
              />
              <span className="p-1 select-none items-center text-zinc-500 justify-center text-xs font-mono tracking-wide leading-3 pointer-events-none border border-zinc-300 dark:border-zinc-500 rounded-md mr-8 font-thin">
                <kbd className="text-inherit" aria-hidden="true">
                  esc
                </kbd>
              </span>
            </div>

            {query === "" && <NoResults />}
            {query !== "" && transformedContent.length === 0 && <NoResults />}

            {transformedContent.length > 0 && (
              <Combobox.Options className="px-4 pb-4 max-h-[30rem] scroll-p-12 space-y-2 overflow-y-auto">
                {transformedContent.map((content: any) => (
                  <li key={content.slug}>
                    <div className=" pl-1 py-2 gap-2 flex items-center">
                      <DocumentTextIcon className="h-7 w-7 text-zinc-600 dark:text-zinc-300" />
                      <h2 className="font-semibold text-zinc-600 dark:text-zinc-300">
                        {content.label}
                      </h2>
                    </div>
                    <ul className="text-zinc-600 dark:text-zinc-300 font-semibold">
                      {content.content.map((section: any) => (
                        <div>
                          <Combobox.Option
                            key={section.header}
                            className={({ active }) =>
                              `${
                                active &&
                                "bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100 rounded-lg"
                              }`
                            }
                            value={`/${content.slug}#${cleanHeaderLink(
                              section.header
                            )}`}
                          >
                            <div className="cursor-pointer border-l-2 border-zinc-400 ml-4 pl-4 py-4 gap-2 flex items-center">
                              <HashtagIcon className="h-6 w-6" />
                              <p>{section.header}</p>
                            </div>
                          </Combobox.Option>

                          {section.paragraphs.map(
                            (paragraph: any, index: any) => (
                              <Combobox.Option
                                key={index}
                                className={({ active }) =>
                                  `${
                                    active &&
                                    "bg-zinc-100 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100 rounded-lg"
                                  }`
                                }
                                value={`/${content.slug}#${cleanHeaderLink(
                                  section.header
                                )}`}
                              >
                                <div className="cursor-pointer border-l-2 border-zinc-400 ml-4 pl-4 py-4 gap-2 flex items-center">
                                  <Bars3BottomLeftIcon className="h-6 w-6 " />
                                  <p>{paragraph.slice(0, 75)}</p>
                                </div>
                              </Combobox.Option>
                            )
                          )}
                        </div>
                      ))}
                    </ul>
                  </li>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
