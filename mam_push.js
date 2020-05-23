const fs = require('fs');
const Mam = require('@iota/mam')
const { asciiToTrytes, trytesToAscii } = require('@iota/converter')
const mode = 'public'
const provider = 'https://nodes.devnet.iota.org'

const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`

const readingValues = process.argv[2]

let mamState = Mam.init(provider)
// Initialise MAM State
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
    //console.log('Published', packet, '\n');
    //console.log("Interno:",message.root)
    if (!fs.existsSync('firstT.id')){
            fs.writeFile('firstT.id',message.root,function(err){})
    }
    fs.writeFile('lastT.json',JSON.stringify(mamState), function(err){});
    return message.root
}

jPacket = JSON.parse(readingValues)
jPacket["timestamp"]=(new Date()).toLocaleString()

publish(jPacket)
