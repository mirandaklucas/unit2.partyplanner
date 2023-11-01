const COHORT = "2309-FTB-ET-WEB-FT"
const API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/" + COHORT

const state = {
    events: []
}

const partyList = document.getElementByID('party-list')

async function getEvents() {
    try {
        const reponse = await fetch(API + "/events")
        const json = await reponse.json()
        state.events = json.data
        render()
    } catch(err) {
        console.err(err)
    }
}

function render() {
    const events = state.events.map((event) => {
        const article = document.createElement("article")
        const deleteButton = document.createElement("button")
        deleteButton.innerText = "X"
        deleteButton.addEventListener("click", async() => {
            try {
                const response = await fetch(API + `/events/${event.id}`, {
                    method: "DELETE"
                })
                getEvents()
            } catch(err) {
                console.error(err)
            }
        })
        article.innerHTML = `
        <h3>${event.name}</h3>
        <address>${event.location}</address>`

        return article
    })
    partyList.replaceChildren(...events)
}


getEvents()

