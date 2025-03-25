const storytext = document.getElementById("story-text");
const choicesDiv = document.getElementById("choices");
const restartbutton = document.getElementById("restart");

// Story Nodes
const storynodes = {
  start: {
    text: "You awaken, head throbbing, the taste of whiskey still on your tongue. The floor beneath you is sticky, and the air smells of dust and rain. The dim light sways on the ceiling above, casting an uneven light over the tavern. The room is eerily quiet. Where is everyone? You need to find out what happened.",
    choices: [
      { text: "Check the bar", next: "checkbar" },
      { text: "Try the front door", next: "lockeddoor" }
    ]
  },
  checkbar: {
    text: "You stumble over to the bar and notice dots of blood near a large crack in the counter's wood. That's new. Next to the crack sits an envelope, a bottle of whiskey, and a safe.",
    choices: [
      { text: "Open the envelope", next: "openenvelope" },
      { text: "Open the safe", next: "safepuzzle" },
      { text: "Drink the whiskey", next: "drunkmode" }
    ]
  },
  lockeddoor: {
    text: "Locked. You need to find the key.",
    choices: [{ text: "Check the bar", next: "checkbar" }]
  },
  openenvelope: {
    text: "You pick up the envelope. THEY ARE WATCHING. DON'T FORGET. A riddle is scribbled below: 'The more you take, the more you leave behind. What am I?'",
    choices: [{ text: "Open the safe", next: "safepuzzle" }]
  },
  safepuzzle: {
    text: "I am a 4 digit code. My digits add up to 10, but no single digit is larger than 5, and no number is repeated. What am I?",
    choices: [{ text: "Enter 1234", next: "keyfound" }]
  },
  keyfound: {
    text: "The safe clicks open, revealing an old, rusty key.",
    choices: [{ text: "Unlock the tavern door", next: "leavetavern" }]
  },
  drunkmode: {
    text: "The whiskey burns your throat as you drink. The room starts spinning...maybe that was a bad idea.",
    choices: [{ text: "Open the envelope", next: "openenvelopeDrunk" }]
  },
  openenvelopeDrunk: {
    text: "You pick up the envelope. THEY ARE WATCHING. DON'T FORGET. A riddle is scribbled below: 'The more you take, the more you leave behind. What am I?'",
    choices: [{ text: "Try the safe", next: "safepuzzleDrunk" }]
  },
  safepuzzleDrunk: {
    text: "I am a 4 digit code. My digits add up to 10, but no single digit is larger than 5, and no number is repeated. What am I?",
    choices: [{ text: "Enter 1234", next: "keyfound" }]
  },
  leavetavern: {
    text: "The cold foggy air hits you in the face. The town is eerily quiet. The fog is so thick that you can't see more than a few feet ahead of you. There are a set of footsteps on the ground leading toward the direction of the Sheriff's office.",
    choices: [
      { text: "Go to sheriff's office", next: "sheriffoffice" },
      { text: "Go into town", next: "gotown" }
    ]
  },
  sheriffoffice: {
    text: "The sheriff's office looks like it was ransacked. The desk has an old journal on top of it that is open to a random page that reads: It's here. The past, present, and future are intertwined, and the storm brings the truth. The key to the curse is within the boards.",
    choices: [
      { text: "Read the journal", next: "readjournal" },
      { text: "Search the room", next: "searchroom" }
    ]
  },
  readjournal: {
    text: "The storm, the missing folk--it ain't normal. It has to be tied to what they did; the spirits aren't done settling the debt. It started with Old Jimmy Knox in 1888. He struck a deal with something wicked, something that he shouldn't have. Hangman's Hollow used to be a struggling settlement, with families pinching pennies to survive the month. Jimmy got tired of worrying about his family and consulted a witch 2 settlements over about a solution. He traded blood for riches. Every 10 years, a sacrifice is required in order for Hangman's Hollow to survive. Last night, there was no sacrifice....Now we all must suffer.",
    choices: [
      { text: "Search the room", next: "searchroom" },
      { text: "Go to graveyard", next: "graveyard" }
    ]
  },
  searchroom: {
    text: "You notice a floorboard that looks out of place. You lift the loose floorboard to reveal an old key and a map of the old graveyard at the edge of town with a circle drawn in the middle of the graveyard.",
    choices: [{ text: "Go to graveyard", next: "graveyard" }]
  },
  gotown: {
    text: "You start to wander into the foggy town, feeling eyes on you. A creak makes your head whip to look at the well that sits in the center of town square.",
    choices: [
      { text: "Go to the well", next: "well" },
      { text: "Go to the church", next: "church" }
    ]
  },
  church: {
    text: "A shadowy figure stands in the middle of the aisle. 'Answer and earn your fate. Leave and live another day.'",
    choices: [
      { text: "Stay", next: "churchriddle" },
      { text: "Leave", next: "funnyending" }
    ]
  },
  churchriddle: {
    text: "'What is always on its way but never arrives?'",
    choices: [{ text: "Answer: Tomorrow", next: "hintatgraveyard" }]
  },
  hintatgraveyard: {
    text: "'The markings on the crypt are where you'll find your end.'",
    choices: [{ text: "Go to graveyard", next: "graveyard" }]
  },
  well: {
    text: "Something is drawing you to the well. As if in a trance, you allow yourself to touch the water when a hand comes out and grabs you, dragging you below the surface.",
    choices: [{ text: "You Lose.", next: "restart" }]
  },
  funnyending: {
    text: "You turn around and start to find your way to the edge of town. You're a cowboy, not a priest, and surely not a ghost hunter. Whatever happened here ain't your problem. You whistle loudly, a horse running up beside you, and you ride out of Hangman's Hollow.",
    choices: [{ text: "Play again", next: "restart" }]
  },
  graveyard: {
    text: "You make your way through the foggy graveyard. A large crypt stands in the center of the graveyard, covered in markings. You remember that the figure in the church warned you about the markings. The markings on the crypt glow. There are 3 buttons: Clock, Skull, Scales.",
    choices: [{ text: "Press Clock, Scales, Skull", next: "goodending" }]
  },
  goodending: {
    text: "The ground trembles and the door to the crypt opens. The fog starts to lift and the sky returns to its normal light blue color. You have broken the curse on Hangman's Hollow..The victim's spirits were freed when the crypt was opened. They are finally able to rest.",
    choices: [{ text: "Play again", next: "restart" }]
  }
};

// Start the game
function startgame(node) {
  storytext.innerText = storynodes[node].text;
  choicesDiv.innerHTML = "";

  storynodes[node].choices.forEach(choice => {
    const button = document.createElement("button");
    button.innerText = choice.text;
    button.onclick = () => startgame(choice.next);
    choicesDiv.appendChild(button);
  });
}

startgame("start");