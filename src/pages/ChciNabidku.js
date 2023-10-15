import "./css/ChciNabidku.css"
import React, { useEffect, useState} from 'react';
import VyberNemovitosti from "./form/faze1/VyberNemovitosti"
import SeznamKraju from "./form/faze1/SeznamKraju"
import SeznamOkresu from "./form/faze1/SeznamOkresu"
import { projectFirestore } from "../firebase/Config"


const ChciNabidku = () => {
  const [prvniFazeForm,setPrvniFazeForm] = useState(true)
  const [errorFaze, setErrorFaze] = useState("")
  const [zobrazeniFormulare,setZobrazeniFormulare] = useState(true)

  // Form - Faze 1
  const [selectedType, setSelectedType] = useState("")
  const [selectedKraj, setSelectedKraj] = useState("")
  const [selectedOkres, setSelectedOkres] = useState("")
  // Form - Faze 2
  const [formData2,setFormData2] = useState({
    name:"",
    phone:"",
    email:""
  })

  const inputChange = (event) => {
    const { name, value } = event.target

    // Regulární výraz pro kontrolu, zda vstup obsahuje pouze písmena a mezery + česka a německá abeceda
    const regex1 = /^[a-zA-Z\s\u0100-\u024F]*$/
    const regex2 = /^\+?[0-9]*$/;
    const regex3 = /^[a-zA-Z0-9._%+-]*@{0,1}[a-zA-Z0-9]*\.{0,1}[a-z]{0,5}$/;

    // [a-z0-9] male pismena a čisla
    //[a-zA-Z\s\u0100-\u024F] - mala a velka pismena a znaky česke a sloveske abecedy
    // {0,5} - 0 az 5*
    // + - jednou nebo vicekrat
    // * - libovolno mnozství včetně 0
    // \ - se dava pred povinne znaky kdyz to hazy error

  if(name === "name" && !regex1.test(value)){
    return
  }
  if(name === "phone" && !regex2.test(value)){
    return
  }
  if (name === "email" && !regex3.test(value)) {
    return;
  }
    
    // Aktualizujte stav formData pro daný input
    setFormData2({
      ...formData2,
      [name]: value,
    })
  }


  
 // ZMENIT JMENO ---------------------
  const typNemovitosti = (e) => {
    setSelectedType(e.target.value)
  };

  // Kraje
  const kraje = (e) => {
    setSelectedKraj(e.target.value)
    setSelectedOkres("")
}
// Okresy
  const okresy = (e) => {
    setSelectedOkres(e.target.value)
  }

  // Error auto-clear
  useEffect( () => {
    if(selectedType !== "" && selectedKraj !== "" && selectedOkres !== ""){
      setErrorFaze("")
    }
  },[selectedType,selectedKraj,selectedOkres])

  // BTN funkce
  const kontrolaFaze1 = () => {
    if(selectedType === "" || selectedKraj === "" || selectedOkres === ""){
      setErrorFaze("Vyplňtě všechna pole")
    }
    else{
      setErrorFaze("")
      setPrvniFazeForm(!prvniFazeForm)
    }
  }

  // BTN odeslat
  const btnSubmit = async (e) => {
    e.preventDefault()
    const regex1a = /^[A-ZÄÖÜßÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-zäöüßáčďéěíňóřšťúůýž]{2,} [A-ZÄÖÜßÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-zäöüßáčďéěíňóřšťúůýž]{1,}$/
    const regex1b = /^[A-ZÄÖÜßÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-zäöüßáčďéěíňóřšťúůýž]{2,} [A-ZÄÖÜßÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-zäöüßáčďéěíňóřšťúůýž]{1,} [A-ZÄÖÜßÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ][a-zäöüßáčďéěíňóřšťúůýž]{1,}$/
    const regex2a = /^[0-9]{9}$/;
    const regex2b = /^\+[0-9]{12}$/;
    const regex3 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/;
    if(formData2.name === ""){
      setErrorFaze("Zadejte Vaše jméno")
    }
    else if(formData2.name !== "" && !(regex1a.test(formData2.name) || regex1b.test(formData2.name))){
      setErrorFaze("Zadejte platný formát jména")
    }
    else if(formData2.phone === ""){
      setErrorFaze("Zadejte Vaše telefoní číslo")
    }
    else if(formData2.phone !== "" && !(regex2a.test(formData2.phone) || regex2b.test(formData2.phone))) {
      setErrorFaze("Telefonní číslo má špatný formát");
    } 
    else if(formData2.email === ""){
      setErrorFaze("Zadejte Váš E-mail")
    }
    else if(!regex3.test(formData2.email)){
      setErrorFaze("E-mail má špatný formát")
    }
    // Dobře zadaný telefon a email
    else{
      const datum = new Date();
      const datumFormat = new Intl.DateTimeFormat("cs-CZ", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(datum);

      // Firebase new Nabídka
      const newChciNabidku = {
        Estate_type: selectedType,
        Region: selectedKraj,
        District: selectedOkres,
        Fullname: formData2.name,
        Phone: formData2.phone,
        Email: formData2.email,
        Date: datumFormat
      };
  
      // Firebase add 
      try{
        await projectFirestore.collection("chci-nabidku").doc(new Date().getTime().toString()).set(newChciNabidku);











          setZobrazeniFormulare(false) // odeslano
        
          setTimeout(() => {
            //Nahození původního formuláře Fáze1
            setZobrazeniFormulare(true)
            setPrvniFazeForm(true)
      
            //Nulování
            setErrorFaze("")
            setSelectedType("")
            setSelectedKraj("")
            setSelectedOkres("")
            setFormData2({
              name: "",
              phone: "",
              email: ""
            });
          }, 5000)
      }
      catch(err){
        setErrorFaze("Nabídka nebyla přidána, kontaktujte naší firmu " + err.message)
      }    
    }
  }


// -----------------------------------------------------
  return <section className="chci-nabidku">
    {/* Zobrazený formulář */}
    {zobrazeniFormulare && <article className="odesilaci-formular">
      <h1>Zadejte {prvniFazeForm ? " informace o Vaší nemovitosti":  "své údaje"}</h1><br />
      <form>

        {/* První fáze */}
      {prvniFazeForm && <div className="faze1">
          <div className="faze-div">
            <h2>Typ nemovitosti</h2>
            <VyberNemovitosti selectedType={selectedType} typNemovitosti={typNemovitosti} />
          </div>
          <div className="faze-div">
              <h2>Vyberte kraj</h2>
              <SeznamKraju kraje={kraje} selectedKraj={selectedKraj} />
          </div>
          <div className="faze-div-posledni">
              <h2>Vyberte okres</h2>
              <SeznamOkresu okresy={okresy} selectedKraj={selectedKraj} selectedOkres={selectedOkres} />
          </div>
        </div>}

        {/* Druhá fáze */}
        {!prvniFazeForm && <div className="faze2">
          <div className="faze2-container">
            <div className="faze-div">
                <h2>Celé jméno</h2>
                <input type="text" placeholder="Jméno Přijmení" name="name" value={formData2.name} onChange={inputChange} />
              </div>
              <div className="faze-div">
                  <h2>Telefon</h2>
                  <input placeholder="tel.:"  type="text" name="phone" value={formData2.phone} onChange={inputChange} />
              </div>
              <div className="faze-div-posledni">
                  <h2>E-mail</h2>
                  <input type="email" placeholder="e-mail:" name="email" value={formData2.email} onChange={inputChange} />
              </div>
            </div>
          <input type="submit" onClick={btnSubmit} />
        </div>}
        
        
      </form>
      {/* Button change faze */}
      <div className="pod-Form">
        <p>{errorFaze}</p>
        <button className="btn-dalsiFaze" onClick={kontrolaFaze1}>{prvniFazeForm ? "další" : "Zpět"}</button>
      </div>
    </article>}

    {/* Skrytý formulář + potvrzení odeslání */}
    {!zobrazeniFormulare && <article className="potvrzeni">

      <h2>odeslano</h2>
      <p>Brzy Vás kontaktujeme</p>
    </article>}
  </section>
}

export default ChciNabidku