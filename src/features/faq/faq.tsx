import { useEffect, useMemo, useState } from "react";
import "./faq.scss";
import { FAQ_STRUCTURE, type FaqItem } from "./faq.types";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function highlight(text: string, search: string) {
  if (!search) return text;
  const regex = new RegExp(`(${search})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

function Faq() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t: tFaq } = useTranslation("faq");
  const { t: tCommon } = useTranslation("common");

  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(FAQ_STRUCTURE[0].id);
  const [selectedCategory, setSelectedCategory] = useState(
    FAQ_STRUCTURE[0].category,
  );

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    const fromHash = FAQ_STRUCTURE.find((f) => f.id === hash);
    if (fromHash) {
      setSelectedId(fromHash.id);
      setSelectedCategory(fromHash.category);
    }
  }, [location.hash]);

  const filteredFaqs = useMemo(() => {
    if (!search) return FAQ_STRUCTURE;
    const q = search.toLowerCase();

    return FAQ_STRUCTURE.filter((item) => {
      const question = tFaq(`items.${item.id}.question`).toLowerCase();
      const answer = tFaq(`items.${item.id}.answer`).toLowerCase();
      return question.includes(q) || answer.includes(q);
    });
  }, [search, tFaq]);

  const groupedFaqs = useMemo(() => {
    return filteredFaqs.reduce<Record<string, FaqItem[]>>((acc, item) => {
      acc[item.category] ??= [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [filteredFaqs]);

  const categories = Object.keys(groupedFaqs);

  useEffect(() => {
    if (!categories.length) return;
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const itemsOfSelectedCategory = groupedFaqs[selectedCategory] ?? [];

  useEffect(() => {
    if (!itemsOfSelectedCategory.length) return;
    if (!itemsOfSelectedCategory.some((item) => item.id === selectedId)) {
      setSelectedId(itemsOfSelectedCategory[0].id);
    }
  }, [itemsOfSelectedCategory, selectedId]);

  const orderedItems = useMemo(() => {
    const selected = itemsOfSelectedCategory.find((item) => item.id === selectedId);
    const rest = itemsOfSelectedCategory.filter((item) => item.id !== selectedId);
    return selected ? [selected, ...rest] : itemsOfSelectedCategory;
  }, [itemsOfSelectedCategory, selectedId]);

  const handleSelectQuestion = (item: FaqItem) => {
    setSelectedId(item.id);
    setSelectedCategory(item.category);
    navigate(`#${item.id}`, { replace: true });
  };

  return (
    <div className="faq-page">
      <div className="faq-topbar">
        <div className="faq-search">
          <input
            type="text"
            placeholder={`${tCommon("search")} ${tCommon("into")} FAQ...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <h1>{tFaq("title")}</h1>
      </div>

      <div className="faq-layout">
        <aside className="faq-categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`faq-category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="faq-category-title">
                {tFaq(`categories.${category}`)}
              </span>
              <span className="faq-category-count">
                {groupedFaqs[category]?.length ?? 0}
              </span>
            </button>
          ))}
          {!categories.length && (
            <p className="faq-empty">{tCommon("noresult")}</p>
          )}
        </aside>

        <main className="faq-docs">
          <section className="faq-article">
            <h2>{tFaq(`categories.${selectedCategory}`)}</h2>
            <p className="faq-intro">
              Retrouvez ici les reponses detaillees. Utilisez le bloc "On this
              page" pour naviguer rapidement entre les sous-themes.
            </p>

            {orderedItems.map((item) => (
              <article
                id={item.id}
                key={item.id}
                className={`faq-article-block ${
                  item.id === selectedId ? "active" : ""
                }`}
              >
                <h3
                  dangerouslySetInnerHTML={{
                    __html: highlight(tFaq(`items.${item.id}.question`), search),
                  }}
                />
                <p
                  style={{ whiteSpace: "pre-line" }}
                  dangerouslySetInnerHTML={{
                    __html: highlight(tFaq(`items.${item.id}.answer`), search),
                  }}
                />
                <p className="faq-extra-text">
                  Conseil: verifiez egalement les parametres lies a ce theme
                  pour personnaliser le comportement de l'application.
                </p>
              </article>
            ))}

            {!orderedItems.length && (
              <p className="faq-empty">{tCommon("noresult")}</p>
            )}
          </section>

          <div className="faq-toc">
            <p className="faq-toc-title">On this page</p>
            {orderedItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`faq-toc-link ${item.id === selectedId ? "active" : ""}`}
                onClick={() => handleSelectQuestion(item)}
                dangerouslySetInnerHTML={{
                  __html: highlight(tFaq(`items.${item.id}.question`), search),
                }}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Faq;
