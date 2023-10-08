import data_seznamOkresu from "../../../data/seznamOkresu"
import { useState, useEffect } from "react"

const SeznamOkresu = ({ okresy, selectedKraj, selectedOkres }) => {
  const [seznamOkresu, setSeznamOkresu] = useState([]);

  // Filtrování seznamu okresů 
  useEffect(() => {
    const seznamOkresu_filter = data_seznamOkresu.filter((oneOkres) => {
      return selectedKraj === oneOkres.idOkresu;
    });
    setSeznamOkresu(seznamOkresu_filter);
  }, [selectedKraj]); 

  return (
    <section className="kraje-okresyFaze1">
      <select onChange={okresy} value={selectedOkres}>
        <option value="">Vyberte Okres:</option>
        {seznamOkresu.map((oneOkres) => (
          <option key={oneOkres.id} value={oneOkres.name}>
            {oneOkres.name}
          </option>
        ))}
      </select>
    </section>
  );
};

export default SeznamOkresu;