const fs = require('fs');
const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'
//receive parameter(json object)
const readingValues = process.argv[2]

// Initialise MAM State
let mamState = Mam.init(provider)
// Recover last MAM State
try{
        let lastState = JSON.parse(fs.readFileSync('lastT.json'))
        mamState["channel"]["next_root"]=lastState["channel"]["next_root"]
        mamState["channel"]["start"]=lastState["channel"]["start"]
        mamState["seed"]=lastState["seed"]
}catch(err){}

// Publish to tangle
const publish = async packet => {
    const trytes = asciiToTrytes(JSON.stringify(packet))
    const message = Mam.create(mamState, trytes)
    mamState = message.state
    await Mam.attach(message.payload, message.address, 3, 9)
	//SAVE ROOT NODE
    if (!fs.existsSync('firstT.id')){
            fs.writeFile('firstT.id',message.root,function(err){})
    }
	//UPDATE LAST STATE
    fs.writeFile('lastT.json',JSON.stringify(mamState), function(err){});
    return message.root
}
jPacket = JSON.parse(readingValues)
jPacket["timestamp"]=(new Date()).toLocaleString()
publish(jPacket)
//Check your stream at:
// https://mam-explorer.firebaseapp.com/?provider=https%3A%2F%2Fnodes.devnet.iota.org&mode=public&root=<ROOT ID>
//<ROOT_ID>: Check in ‘firstT.id’ file 
