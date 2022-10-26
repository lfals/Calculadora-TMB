import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [gender, setGender] = useState("")
  const [inputValues, setInputValues] = useState({
    weight: 0,
    height: 0,
    age: 0
  })

  //   Fórmula para homens: TMB = fator da taxa de atividade x { 66 + [(13, 7 x Peso(kg)) + (5 x Altura(cm)) – (6, 8 x Idade(anos))] }

  // Fórmula para mulheres: TMB = fator da taxa de atividade x { 655 + [(9, 6 x Peso(kg)) + (1, 8 x Altura(cm)) – (4, 7 x Idade(anos))] }

  function CalculateTMB(activity: number) {
    if (gender === "men") {
      return (activity * (66 + ((13.7 * inputValues.weight) + (5 * inputValues.height) - (6.8 * inputValues.age)))).toFixed(2)
    }
    if (gender === "woman") {
      return (activity * (655 + ((9.6 * inputValues.weight) + (1.8 * inputValues.height) - (4.7 * inputValues.age)))).toFixed(2)

    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Calculadora de Taxa metabólica basal" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="/api/og"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Calculadora TMB
        </h1>
        <p>Taxa metabólica basal</p>



        <div className={styles.grid}>
          <div className={styles['button-container']}>
            <button style={gender === "men" ? { backgroundColor: "white", color: 'black' } : {}} onClick={() => setGender("men")}>Homem</button>
            <button style={gender === "woman" ? { backgroundColor: "white", color: 'black' } : {}} onClick={() => setGender("woman")}>Mulher</button>

          </div>
          <div className={styles['input-container']}>
            <input className={styles.input} type="number" onChange={(e) => { setInputValues({ ...inputValues, weight: parseInt(e.target.value) }) }} placeholder='Peso(kg)' />
            <input className={styles.input} type="number" onChange={(e) => { setInputValues({ ...inputValues, height: parseInt(e.target.value) }) }} placeholder='Altura(cm)' />
            <input className={styles.input} type="number" onChange={(e) => { setInputValues({ ...inputValues, age: parseInt(e.target.value) }) }} placeholder='Idade(anos)' />
          </div>
          <div className={styles.card} style={{ width: `100%` }}>
            <h2>TMB</h2>
            <p>{CalculateTMB(1)}</p>
          </div>
          <h1 style={{ textAlign: 'center' }}>Necessidade diária de calorias</h1>
          <h2>Atividade física</h2>
          <div className={styles['ndc-container']}>
            <div className={styles.card}>
              <h2>Nenhuma </h2>
              <p>{CalculateTMB(1.2)}</p>
            </div>
            <div className={styles.card}>
              <h2>Leve </h2>
              <p>{CalculateTMB(1.2)}</p>
            </div>
            <div className={styles.card}>
              <h2> Moderada</h2>
              <p>{CalculateTMB(1.55)}</p>
            </div>
            <div className={styles.card}>
              <h2> Alta</h2>
              <p>{CalculateTMB(1.55)}</p>
            </div>
            <div className={styles.card}>
              <h2> Intensa</h2>
              <p>{CalculateTMB(1.9)}</p>
            </div>
          </div>
        </div>
      </main>

    </div>
  )
}


// Nenhuma atividade física	
// 1972.25
// = NDC
// Atividade física moderada
// (meia hora de caminhada, natação ou bicicleta, quatro vezes por semana)	
// 2130.03
// = NDC
// Atividade física intensa
// (uma hora de corrida, pelo menos quatro vezes por semana)	
// 2287.81
// = NDC