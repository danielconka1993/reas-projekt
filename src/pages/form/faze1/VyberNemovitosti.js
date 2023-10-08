import "./VyberNemovitosti.css"

const VyberNemovitosti = ({ selectedType, typNemovitosti }) => {

  return (
    <div className="vyberNemovitosti">
      <div className="radio">
        <label htmlFor="byt"> Byt </label>
        <input type="radio" id="byt" name="propertyType" value="byt" checked={selectedType === 'byt'} onChange={typNemovitosti} />
      </div>

      <div className="radio">
        <label htmlFor="dum"> Dům </label>
        <input type="radio" id="dum" name="propertyType" value="dum" checked={selectedType === 'dum'} onChange={typNemovitosti} />
      </div>

      <div className="radio">
        <label htmlFor="pozemek"> Pozemek</label>
        <input type="radio" id="pozemek" name="propertyType" value="pozemek" checked={selectedType === 'pozemek'} onChange={typNemovitosti} />
      </div>
      

    </div>
  );
}

export default VyberNemovitosti;