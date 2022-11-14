class Card {
    constructor(
        username,
        rank,
        mainAgent,
        favouriteSkins,
        playstyle
    ) {
        this.username = username;
        this.rank = rank;
        this.mainAgent = mainAgent;
        this.favouriteSkins = favouriteSkins;
        this.playstyle = playstyle;
    }
}

let cardsArr = [new Card("nomsE", 3, "chamber", "Reaver, Ion, Prime", "Main OPer - lurks on attack and anchors on defense.")];

const cardHTML = (card) => {
    return `
        <div class="agent_icon_wrapper">
            <img src="./agent-icons/${card.mainAgent}_icon.webp" class="agent_icon">
        </div>
        <div class="card_text_wrapper">
            <div class="card_username_wrapper">
                <h3>${card.username}</h3>
            </div>
            <div class="card_fav_skins_wrapper">
                <div class="card_fav_skins_title">
                    <h4>
                        Favourite skins:
                    </h4>
                </div>
                <div>
                    <p>
                        ${card.favouriteSkins}
                    </p>
                </div>
            </div>
            <div class="card_playstyle_wrapper">
                <div class="card_playstyle_title">
                    <h4>
                        Playstyle:
                    </h4>
                </div>
                <div>
                    <p>
                        ${card.playstyle}
                    </p>
                </div>
            </div>
        </div>
        <div class="rank_icon_wrapper">
            <img src="./rank-icons/Rank${card.rank}.webp" class="rank_icon">
        </div>
    `;
};

const createCardElement = (card) => {
    let newCardElement = document.createElement("div");
    newCardElement.setAttribute("class", "card");
    newCardElement.innerHTML = cardHTML(card);
    return newCardElement;
};

const renderCards = () => {
    let cards = document.querySelector(".cards");
    cards.innerHTML = "";
    cardsArr.sort((a, b) => a.rank - b.rank);
    cardsArr.map((card) => {
        cards.append(CreateCardElement(card));
    });
};

const addNewCard = (Card) => {
    cardsArr.push(Card);
    renderCards();
};

const addToCards = (event) => {
    var username = document.getElementById("username").value;
    var rank = document.getElementById("rank").value;
    var mainAgent = document.querySelector('input[name="main_agent"]:checked')?.value;
    var favouriteSkins = CommaDelimitCheckedItems(document.getElementsByName('fav_skin'));
    var playstyle = document.getElementById("playstyle").value;

    if (!username || !rank || !mainAgent || !favouriteSkins || !playstyle) {
        alert("You're missing an input!")
    }
    else {
        addNewCard(new Card(username, rank, mainAgent, favouriteSkins, playstyle));
        document.getElementById("inputs").reset();
    }
};

window.onload = function () {
    renderCards();
};

function CommaDelimitCheckedItems(checkgroup) {
    var checkgroup = checkgroup;
    var s = [];
    for (var i = 0; i < checkgroup.length; i++) {
        if (checkgroup[i].checked) {
            s.push(checkgroup[i].value);
        }
    }
    return s.length == 0 ? "None" : s.join(', '); 
}

function CheckboxLimit(checkgroup, limit) {
    var checkgroup = checkgroup;
    var limit = limit;
    for (var i = 0; i < checkgroup.length; i++) {
        checkgroup[i].onclick = function () {
            var checkedcount = 0
            for (var i = 0; i < checkgroup.length; i++)
                checkedcount += (checkgroup[i].checked) ? 1 : 0
            if (checkedcount > limit) {
                alert("You can only choose 3 favourite skins!")
                this.checked = false
            }
        }
    }
}

CheckboxLimit(document.forms.inputs.fav_skin, 3);