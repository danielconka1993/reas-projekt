import data_seznamKraju from "../../../data/seznamKraju";

const SeznamKraju = ({ kraje, selectedKraj }) => {
  return (
    <section className="kraje-okresyFaze1">
      <select onChange={kraje} value={selectedKraj}>
        <option value="">Vyberte kraj:</option>
        {data_seznamKraju.map((oneKraj) => {
          return (
            <option key={oneKraj.id} value={oneKraj.name}>
              {oneKraj.name}
            </option>
          );
        })}
      </select>
    </section>
  );
};

export default SeznamKraju;
