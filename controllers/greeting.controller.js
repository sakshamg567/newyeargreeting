(async () => {
   const { nanoid: importedNanoid } = await import('nanoid');
   nanoid = importedNanoid; // Assign it to a variable
})();

const GREETING = require("../models/greeting.model")

const greetings = [
   "🎆 Wishing you a year filled with love, laughter, and unforgettable memories. Happy New Year!",
   "🌟 Cheers to 365 new chances! May this year be your best one yet. Happy New Year!",
   "🎇 Wishing you health, wealth, and endless happiness this year. Happy New Year!",
   "🎉 Happy New Year! May this year bring you endless joy, fresh opportunities, and success in everything you do. Cheers to new beginnings! 🥂✨",
   "✨ Let’s make this year as incredible as you are. Happy New Year!",
   "🎉 Out with the old, in with the new! Here’s to a fresh start. Happy New Year!",
   "💫 New year, same awesome you! Go shine even brighter. Happy New Year!",
   "🌈 May your dreams take flight and your days be bright. Have a fantastic New Year!",
   "🍾 Raise a glass to everything you’ve achieved and all the adventures ahead. Happy New Year!",
   "🕊️ Here’s to a peaceful, prosperous, and joyous New Year for you and your loved ones.",
   "🌟 Cheers to new beginnings and limitless possibilities. Happy New Year!",
   "🎆 This year, may you be the best version of yourself. Wishing you a Happy New Year!",
   "🥳 Let the celebrations begin! Wishing you a year of success and happiness. Happy New Year!",
   "🎊 Another year, another adventure! Let’s make it unforgettable. Happy New Year!",
   "🌟 Here’s to leaving the worries behind and embracing the possibilities ahead. Happy New Year!",
   "🎇 May the sparkles of this new year light up your path. Have a fantastic year ahead!",
   "🥂 Let’s toast to dreams realized and goals achieved. Happy New Year!",
   "🎉 The future is yours to create—make it spectacular. Happy New Year!",
   "✨ Wishing you strength, love, and laughter to carry you through the year. Happy New Year!",
   "🎆 New year, new adventures, new memories. Let’s make them count. Happy New Year!"
];


async function handleGenerateShortidentifier(req,res){
   const body = req.body
   
   if(!body.message) {
      body.message = greetings[Math.floor(Math.random()*20)]
   }
   if(!body.name) {
      return res.status(400).json({error: "sender is required"})
   }
   const id =  nanoid(5)
   const greeting = await GREETING.create({
      shortId: id,
      fromUser: body.name,
      message: body.message
   })
   res.redirect(`/${id}`)
}

module.exports = handleGenerateShortidentifier