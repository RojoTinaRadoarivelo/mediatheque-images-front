import { useEffect, useMemo, useState } from "react";
import "./faq.scss";
import { FAQ_DATA, type FaqItem } from "./faq.types";
import { useLocation, useNavigate } from "react-router-dom";

function Faq() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>(FAQ_DATA[0].id);

  /* 🔗 Sync URL → état */
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && FAQ_DATA.some((f) => f.id === hash)) {
      setSelectedId(hash);
    }
  }, [location.hash]);

  /* 🔍 Filtrage */
  const filteredFaqs = useMemo(() => {
    if (!search) return FAQ_DATA;

    const q = search.toLowerCase();
    return FAQ_DATA.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q),
    );
  }, [search]);

  /* 📂 Groupement par catégorie */
  const groupedFaqs = useMemo(() => {
    return filteredFaqs.reduce<Record<string, FaqItem[]>>((acc, item) => {
      acc[item.category] ??= [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [filteredFaqs]);

  const selectedFaq = FAQ_DATA.find((item) => item.id === selectedId);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    navigate(`#${id}`, { replace: true });
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-2xl text-center mb-4">
        ❓ FAQ — Foire aux questions
      </h1>

      {/* 🔍 SEARCH */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Rechercher dans la FAQ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 px-3 py-2 border rounded-md"
        />
      </div>

      <div className="faq-doc">
        {/* ⬅️ SIDEBAR */}
        <aside className="faq-sidebar">
          {Object.entries(groupedFaqs).map(([category, items]) => (
            <div key={category}>
              <div className="px-3 py-2 text-xs font-semibold uppercase text-gray-500">
                {category}
              </div>

              {items.map((item) => (
                <button
                  key={item.id}
                  className={`faq-link ${
                    selectedId === item.id ? "active" : ""
                  }`}
                  onClick={() => handleSelect(item.id)}
                >
                  {item.question}
                </button>
              ))}
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <p className="p-4 text-sm text-gray-500">Aucun résultat trouvé.</p>
          )}
        </aside>

        {/* ➡️ CONTENT */}
        <main className="faq-content bg-white p-4">
          {selectedFaq ? (
            <>
              <h2>{selectedFaq.question}</h2>
              <p style={{ whiteSpace: "pre-line" }}>{selectedFaq.answer}</p>
            </>
          ) : (
            <p>Sélectionnez une question.</p>
          )}
        </main>
      </div>
    </div>
  );
}

export default Faq;
