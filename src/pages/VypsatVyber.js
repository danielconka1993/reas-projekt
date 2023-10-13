import "./css/VypsatVyber.css"
import { useState} from "react"
import React from 'react';
import data_seznamKraju from "../data/seznamKraju"
import data_seznamOkresu from "../data/seznamOkresu"
import { projectFirestore } from "../firebase/Config"

const VypsatVyber = () => {
  const [inputVyhledavac, setInputVyhledavac] = useState("")
  const [selectedKrajVypis, setSelectedKrajVypis] = useState("")
  const [selectedOkresVypis, setSelectedOkresVypis] = useState("")


  const [data, setData] = useState([]);
  const [error, setError] = useState("")
  
  const vyhledavac = (e) => {
    setInputVyhledavac(e.target.value)
  }

  const selectedKraj = (e) => {
    setSelectedKrajVypis(e.target.value)
    setSelectedOkresVypis("")
  }

  const selectedOkres = (e) => {
    setSelectedOkresVypis(e.target.value)
    setSelectedKrajVypis("")
  }

  // Firebase -------------------------------------------------------------------------------

  const fetchDataFromDatabase = async () => {
    let collectionRef = projectFirestore.collection("chci-nabidku");
  
    if (selectedKrajVypis || selectedOkresVypis) {
      // Vytvoření základního dotazu
      collectionRef = collectionRef.where((selectedKrajVypis === "" ? "District" : "Region"), '==', (selectedKrajVypis === "" ? selectedOkresVypis : selectedKrajVypis));
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      if (snapshot.empty) {
        setError("Žádné nabídky k vypsání");
        setData([]);
      } else {
        let result = [];
        snapshot.docs.forEach((oneNabidka) => {
          const data = oneNabidka.data();
          if (inputVyhledavac) {
            const regex = new RegExp(`.*${inputVyhledavac}.*`, 'i'); // 'i' znamená, že je ignorován rozdíl mezi malými a velkými písmeny
            if (regex.test(data.Fullname)) {
              result.push({ id: oneNabidka.id, ...data });
            }
          } else {
            result.push({ id: oneNabidka.id, ...data });
          }
        });
        setData(result);
        setError("");
      }
    }, (err) => setError(err.message));
  
    return () => unsubscribe();
  };

  

  // BTN Vypis
  const btnVypsat = (e) => {
    e.preventDefault()

    if (selectedKrajVypis || selectedOkresVypis || inputVyhledavac) {
      setData([]);
      fetchDataFromDatabase();
    }
    else{setError("Vyberte alespoň jednu z možností vyhledání")}
  }

// ´--------------------------------------------------------------------
  return <section className="VypsatVyber">
    <article className="form">
    <form>

      <div>
        <input type="text" onChange={vyhledavac} value={inputVyhledavac} />
      </div>
      <div className="kraj">
        <select name="kraj" value={selectedKrajVypis} onChange={selectedKraj}>
          <option value="">Vyberte kraj:</option>
          {
            data_seznamKraju.map( (oneKraj) => {
              return <option key={oneKraj.id} value={oneKraj.name}>{oneKraj.name}</option>
            })
          }
        </select>
      </div>
      <div className="okres">
          <select name="okres" value={selectedOkresVypis} onChange={selectedOkres}>
            <option value="">Vyberte okres:</option>
            {
              // Přidat podmínku pro filter
              data_seznamOkresu.map( (oneOkres) => {
                // optGroup
                if(oneOkres.id === 1 || oneOkres.id === 11 || oneOkres.id === 23 || oneOkres.id === 29 || oneOkres.id === 37 || oneOkres.id === 40 || oneOkres.id === 47 || oneOkres.id === 51 || oneOkres.id === 56 || oneOkres.id === 60 || oneOkres.id === 65 || oneOkres.id === 72 || oneOkres.id === 77 || oneOkres.id === 81){
                  return <React.Fragment key={oneOkres.id}>
                      <optgroup label={oneOkres.idOkresu}></optgroup>
                      <option  value={oneOkres.name}>{oneOkres.name}</option>
                    </React.Fragment>
                }
                else{
                  return <option key={oneOkres.id} value={oneOkres.name}>{oneOkres.name}</option>
                }
              })
            }
          </select>
      </div>
      <input type="submit" onClick={btnVypsat} />
      </form>
      {/* Error */}
      <p>{error}</p>
    </article>

    <article className="vypsane-nabídky">
    <h2>Výpis nabídek</h2>
          {data.map((oneData) => {
            const {Region, Date, District, Email, Estate_type, Fullname, Phone} = oneData
            return <div key={oneData.id} className="jedna-nabídka">
              <p>{Region}</p>
              <p>{District}</p>
              <p>{Email}</p>
              <p>{Estate_type}</p>
              <p>{Fullname}</p>
              <p>{Phone}</p>
              <p>{Date}</p>
            </div>
          })}
    </article>
  </section>
}

export default VypsatVyber