import "./css/VypsatVyber.css"
import { useState} from "react"
import React from 'react';
import data_seznamKraju from "../data/seznamKraju"
import data_seznamOkresu from "../data/seznamOkresu"
import { projectFirestore } from "../firebase/Config"

const VypsatVyber = () => {
  const [inputEmail,setInputEmail] = useState("")
  const [inputVyhledavac, setInputVyhledavac] = useState("")
  const [selectedKrajVypis, setSelectedKrajVypis] = useState("")
  const [selectedOkresVypis, setSelectedOkresVypis] = useState("")


  const [data, setData] = useState([]);
  const [error, setError] = useState("")
  
  const funkceEmail = (e) => {
    setInputEmail(e.target.value)
    setSelectedKrajVypis("")
    setSelectedOkresVypis("")
    setInputVyhledavac("")
  }

  const vyhledavac = (e) => {
    setInputVyhledavac(e.target.value)
    setInputEmail("")
  }

  const selectedKraj = (e) => {
    setSelectedKrajVypis(e.target.value)
    setSelectedOkresVypis("")
    setInputEmail("")
  }

  const selectedOkres = (e) => {
    setSelectedOkresVypis(e.target.value)
    setSelectedKrajVypis("")
    setInputEmail("")
  }

  // Firebase -------------------------------------------------------------------------------

  const fetchDataFromDatabase = async () => {
    let collectionRef = projectFirestore.collection("chci-nabidku");
  
    if (selectedKrajVypis || selectedOkresVypis) {
      // + Where -> Kraj / Okres
      collectionRef = collectionRef.where((selectedKrajVypis === "" ? "District" : "Region"), '==', (selectedKrajVypis === "" ? selectedOkresVypis : selectedKrajVypis));
    }

    if(inputEmail){
      collectionRef = collectionRef.where("Email", '==', inputEmail);
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      if (snapshot.empty) {
        setError("Žádné nabídky k vypsání");
        setData([]);
      } else {
        let result = [];
        snapshot.docs.forEach((oneNabidka) => {
          const data = oneNabidka.data();
          // Přes vyhledávač
          if (inputVyhledavac) {
            const regex = new RegExp(`.*${inputVyhledavac}.*`, 'i'); // 'i' znamená, že je ignorován rozdíl mezi malými a velkými písmeny
            if (regex.test(data.Fullname)) {
              result.push({ id: oneNabidka.id, ...data });
            }
          } 
          else {
            result.push({ id: oneNabidka.id, ...data });
          }
        });
        setData(result)
        setInputEmail("")
        setInputVyhledavac("")
        setSelectedKrajVypis("")
        setSelectedOkresVypis("")
        setError("")
      }
    }, (err) => setError(err.message));
  
    return () => unsubscribe();
  };

  

  // BTN Vypis
  const btnVypsat = (e) => {
    e.preventDefault()

    if (selectedKrajVypis || selectedOkresVypis || inputVyhledavac || inputEmail) {
      setData([]);
      fetchDataFromDatabase();
    }
    else{setError("Vyberte alespoň jednu z možností vyhledání")}
  }

// ´--------------------------------------------------------------------
  return <section className="VypsatVyber">
    <article className="form">
    <form>
 {/* Box 1 */}
      <div className="hledaci-box-1">
        <h2>Celý e-mail</h2>
        <input type="text" placeholder="Celý Email zadavatele" onChange={funkceEmail} value={inputEmail} />
      </div>

  {/* Box 2 */}
      <div className="hledaci-box-2">
        <h1>Vyberte</h1>
        <div className="kraj-okres">
          
            {/* Kraj */}
          <div className="kraj">
            <h2>Kraj</h2>
            <select name="kraj" value={selectedKrajVypis} onChange={selectedKraj}>
              <option value="">Vyberte kraj:</option>
              {
                data_seznamKraju.map( (oneKraj) => {
                  return <option key={oneKraj.id} value={oneKraj.name}>{oneKraj.name}</option>
                })
              }
            </select>
          </div>

  {/* Okres */}
          <div className="okres">
            <h2>Okres</h2>
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
                    } else{
                      return <option key={oneOkres.id} value={oneOkres.name}>{oneOkres.name}</option>
                    }
                  })
                }
              </select>
            </div>
          </div>

{/* Vyhledávač jmen */}
          <div className="name-box">
            <input type="text" placeholder="Jméno zadavatele" onChange={vyhledavac} value={inputVyhledavac} />
            <p>Vyhledejte dle Jména s (krajem/okresem) nebo bez nich </p>
          </div>
        </div>
      
      <div className="submit-box">
   {/* Error */}
        {error && <p>{error}</p>}
        <input type="submit" value="Vyhledat" onClick={btnVypsat} className="btnSubmit" />
      </div>         
      
    </form>
    </article>

    <article className="vypsane-nabídky">
    {data.length > 0 && <h2>Výpis nabídek</h2>}
    {/* Vypsání od konce */}
          {data.slice().reverse().map((oneData) => {
            const {Region, Date, District, Email, Estate_type, Fullname, Phone} = oneData
            return <div key={oneData.id} className="jedna-nabídka">
              <h3>{Fullname}</h3>

              <div className="typ-box">
                <p className="info">Typ: </p>
                <p className="typ-nemovitosti">{Estate_type}</p>
              </div>
              

              <div className="misto">
                <p className="info">Místo: </p>
                <div className="jedna-nabidka-box">
                  <p className="kraj">{Region}</p>
                  <p className="okres">{District}</p>
                </div>
              </div>

              <div className="kontakt">
                <p className="info"> Kontakt: </p>
                <div className="jedna-nabidka-box">
                  <p className="telefon">{Phone}</p>
                  <p className="email">{Email}</p>
                </div>
              </div>

              <p className="datum">{Date}</p>
            </div>
          })}
    </article>
  </section>
}

export default VypsatVyber