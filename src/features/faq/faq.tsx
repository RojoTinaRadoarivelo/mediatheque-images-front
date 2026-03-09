import { useEffect, useMemo, useState } from "react";
import "./faq.scss";
import { FAQ_STRUCTURE, type FaqItem } from "./faq.types";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function highlight(text: string, search: string) {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, "gi");
  return text.replace(regex, `<mark>$1</mark>`);
}

function Faq() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(FAQ_STRUCTURE[0].id);
  const { t: tFaq } = useTranslation("faq");
  const { t: tCommon } = useTranslation("common");
  const [activeIndex, setActiveIndex] = useState(0);

  /* 🔗 Sync URL → état */
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && FAQ_STRUCTURE.some((f) => f.id === hash)) {
      setSelectedId(hash);
    }
  }, [location.hash]);

  /* 🔍 Filtrage */
  const filteredFaqs = useMemo(() => {
    if (!search) return FAQ_STRUCTURE;

    const q = search.toLowerCase();
    return FAQ_STRUCTURE.filter((item) => {
      const question = tFaq(`items.${item.id}.question`).toLowerCase();
      const answer = tFaq(`items.${item.id}.answer`).toLowerCase();

      return question.includes(q) || answer.includes(q);
    });
  }, [search, tFaq]);

  /* 📂 Groupement par catégorie */
  const groupedFaqs = useMemo(() => {
    return filteredFaqs.reduce<Record<string, FaqItem[]>>((acc, item) => {
      acc[item.category] ??= [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [filteredFaqs]);

  /* KEYBOARD NAVIGATION */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!search) return;

      if (e.key === "ArrowDown") {
        setActiveIndex((i) => Math.min(i + 1, filteredFaqs.length - 1));
      }

      if (e.key === "ArrowUp") {
        setActiveIndex((i) => Math.max(i - 1, 0));
      }

      if (e.key === "Enter") {
        const item = filteredFaqs[activeIndex];

        if (item) {
          handleSelect(item.id);
        }
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [search, filteredFaqs, activeIndex]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    navigate(`#${id}`, { replace: true });
  };

  const selectedFaq = FAQ_STRUCTURE.find((item) => item.id === selectedId);

  return (
    <div className="w-full h-full bg-slate-50 p-2">
      <div className="w-full flex space-x-2 items-center mb-4">
        {/* 🔍 SEARCH */}
        <div className="w-80">
          <input
            type="text"
            placeholder={tCommon("search") + ` ` + tCommon("into") + `  FAQ...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-5/6 mx-2 px-3 py-2 border rounded-md"
          />
        </div>
        <h1 className="text-2xl text-center mb-4 mx-auto">
          ❓ {tFaq("title")}
        </h1>
      </div>

      <div className="faq-doc">
        {/* ⬅️ SIDEBAR */}
        <aside className="faq-sidebar my-2">
          {Object.entries(groupedFaqs).map(([category, items]: any) => (
            <div key={category}>
              <div className="px-3 py-2 text-xs uppercase text-gray-500">
                {tFaq(`categories.${category}`)}
              </div>

              {items.map((item: any) => {
                const question = tFaq(`items.${item.id}.question`);

                return (
                  <button
                    key={item.id}
                    className={`faq-link ${
                      selectedId === item.id ? "active" : ""
                    }`}
                    onClick={() => handleSelect(item.id)}
                    dangerouslySetInnerHTML={{
                      __html: highlight(question, search),
                    }}
                  />
                );
              })}
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <p className="p-4 text-sm text-gray-500">{tCommon("noresult")}</p>
          )}
        </aside>

        {/* ➡️ CONTENT */}
        <main className="faq-content w-4/6 h-5/6 mx-auto bg-white rounded-xl shadow-sm  p-4">
          {selectedFaq && (
            <>
              <h2
                dangerouslySetInnerHTML={{
                  __html: highlight(
                    tFaq(`items.${selectedFaq.id}.question`),
                    search,
                  ),
                }}
              />

              <p
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{
                  __html: highlight(
                    tFaq(`items.${selectedFaq.id}.answer`),
                    search,
                  ),
                }}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Faq;
