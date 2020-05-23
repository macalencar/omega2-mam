# omega2-mam
IOTA MAM Push script

This script receives a json object as parameter and publish it into IOTA Tangle using MAM protocol

**Usage:** `#node mam_push.js '{"field1":"value1", "field2":2, "field3":["listitem1","listitem2","listitem3"]}'`

**BE AWARE:** it takes up to 5 minutes to publish a transaction

This file saves the ROOT transaction ID in **firstT.id** and the last MAM state in **lastT.json** so could be possible
to append new transaction to tha same stream.

Note... If you remember, IOTA demands that each client/node performa a small amount of effort to publish its data into tangle.
In this case (Omega2) it is not possible to perform a local PoW... instead you must select a IOTA node that accept do the PoW by 
your device. 

Check your stream in: https://mam-explorer.firebaseapp.com/?provider=https%3A%2F%2Fnodes.devnet.iota.org&mode=public&root=**<firstT.id file content>**

That's it!
