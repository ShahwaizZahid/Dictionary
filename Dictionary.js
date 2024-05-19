let searchBtn = document.querySelector(".searchIcon")
let searchInput = document.querySelector(".searchInput")
let mainContainer = document.querySelector(".mainContainer")
let words = document.querySelector(".word")
let pronunciation = document.querySelector(".pronunciation")
let audioBtn = document.querySelector(".audio-btn")
let wordContainer = document.querySelector(".word-container")
let templatesHeading = document.querySelector(".template-heading")
const notFind = document.querySelector(".not-find")
const mainHeading = document.querySelector(".mainHeading")
const imageChange = document.querySelector(".fa-moon")
let audio;

const sourcesTemplate = document.querySelector(".source-template")
const templateHeading = document.querySelector(".word-noun")

const themeSwitcher = document.querySelector(`input[type= "checkbox"]`)
themeSwitcher.addEventListener("change", ()=>{
   if(themeSwitcher.checked){
      document.documentElement.style.setProperty("--theme-bg", "#eddddd")
      document.documentElement.style.setProperty("--font-color", "black")
      document.documentElement.style.setProperty("--input-bg", "#d3bdbd")
      document.documentElement.style.setProperty("--heading", "black")
      imageChange.classList.remove("fa-moon")
      imageChange.classList.add("fa-sun")
       imageChange.style.color = "yellow"
   }
   else{
      document.documentElement.style.setProperty("--theme-bg", "#171717")
      document.documentElement.style.setProperty("--font-color", "white")
      document.documentElement.style.setProperty("--input-bg", "#374151")
      document.documentElement.style.setProperty("--heading", "grey")
      imageChange.classList.add("fa-moon")
      imageChange.classList.remove("fa-sun")
      imageChange.style.color = "#483285"
   }
})


function idata(result, word) {
   if (result.title) {
       notFind.innerHTML = "Can't find the meaning, example & synonym of that" + word
       notFind.style.display = "block"
       wordContainer.style.display = "none"
   }
   else {
      audio = new Audio(result[0].phonetics[result[0].phonetics.length - 1].audio)
     

      //for word
      words.innerHTML = result[0].word

      //for phonetic
      pronunciation.innerHTML = result[0].phonetic
      templatesHeading.innerHTML = ""

      //for definition
      for (let i = 0; i < result[0].meanings.length; i++) {
         const contest = templateHeading.content.cloneNode(true)

         let wordHeading = contest.querySelector(".noun-heading")
         wordHeading.innerHTML = result[0].meanings[i].partOfSpeech

         let defination = contest.querySelector(".noun-meaning-heading")
         for (let j = 0; j < result[0].meanings[i].definitions.length; j++) {
            let newLi = document.createElement("li")
            defination.appendChild(newLi)
            newLi.classList.add("noun-meaning-heading-list")
            newLi.innerHTML = (result[0].meanings[i].definitions[j].definition)
         }

         //for synonym
         let synonymHeading = contest.querySelector(".synonym-heading")
         for (let k = 0; k < result[0].meanings[i].synonyms.length; k++) {
            if (result[0].meanings[i].synonyms.length != 0) {
               console.log(result[0].meanings[i].synonyms.length)
               let synLi = document.createElement("li")
               synonymHeading.appendChild(synLi)
               synLi.classList.add("synonym-heading-list")
               synLi.innerHTML = result[0].meanings[i].synonyms[k]
            }
            else {
               synonymHeading.innerHTML = ""
            }
         }
         mainHeading.appendChild(contest)



      }
      //For sources template
      const contestSource = sourcesTemplate.content.cloneNode(true)
      let sources = contestSource.querySelector(".sources")
      for (let m = 0; m < result[0].sourceUrls.length; m++) {
         let newSourcesLi = document.createElement("li")
         sources.appendChild(newSourcesLi)
         let newancorLi = document.createElement("a")
         newSourcesLi.appendChild(newancorLi)
         newSourcesLi.classList.add("sources-li")
         newancorLi.href = result[0].sourceUrls[m]
         newancorLi.innerHTML = result[0].sourceUrls[m]
      };
      mainHeading.appendChild(contestSource)
      notFind.style.display = "none"
      wordContainer.style.display = "block"
   }
   
}


 async function fetchApi(word) {
   let ApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    await fetch(ApiUrl).then(res => res.json()).then(result => idata(result, word))
   // mainContainer.append(sourcesTemplate)     
}
if (searchInput.value != searchInput) {
   searchBtn.addEventListener("click", () => {
      
      mainHeading.innerHTML = ""
      fetchApi(searchInput.value)
   })
}

audioBtn.addEventListener("click", () => {
   audio.play()
})

