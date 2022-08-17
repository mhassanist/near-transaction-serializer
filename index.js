const pages = require("./pages")
const nearAPI = require("near-api-js")
const sha256 = require("js-sha256")
const express = require("express")
const { PublicKey } = require("near-api-js/lib/utils")

const app = express()
const port = process.env.PORT || 8080

const DEFAULT_FUNC_CALL_GAS = 30000000000000

app.post(
  "/serializeTransaction",
  express.json({ type: "*/*" }),
  async (req, res) => {
    try {
      sender = req.body.sender
      receiver = req.body.receiver
      publicKeyString = req.body.public_key
      methodName = req.body.method_name
      methodArgs = req.body.method_args
      networkId = req.body.network_id
      action = req.body.action_type
      amountString = req.body.amount
      blockHash = req.body.block_hash
      nonce = req.body.nonce

      const publicKey = PublicKey.from(publicKeyString)
      // console.log('Public Key: ' + base_encode(publicKey));/

      // constructs actions that will be passed to the createTransaction method below
      actions = null
      const amount = nearAPI.utils.format.parseNearAmount(amountString)
      if (action == "transfer") {
        actions = [nearAPI.transactions.transfer(amount)]
      } else if (action == "function_call") {
        actions = [
          nearAPI.transactions.functionCall(
            methodName,
            methodArgs,
            DEFAULT_FUNC_CALL_GAS,
            amount
          ),
        ]
      }

      // converts a recent block hash into an array of bytes
      // this hash was retrieved earlier
      // this is required to prove the tx was recently constructed (within 24hrs)
      const recentBlockHash = nearAPI.utils.serialize.base_decode(blockHash)

      const transaction = nearAPI.transactions.createTransaction(
        sender,
        publicKey,
        receiver,
        nonce,
        actions,
        recentBlockHash
      )
      // before we can sign the transaction we must perform three steps...
      // 1) serialize the transaction in Borsh
      const serializedTx = nearAPI.utils.serialize.serialize(
        nearAPI.transactions.SCHEMA,
        transaction
      )
      // 2) hash the serialized transaction using sha256
      const serializedTxHash = new Uint8Array(sha256.sha256.array(serializedTx))

      res.send(serializedTxHash)
    } catch (err) {
      res.send(err)
    }
  }
)

app.post(
  "/serializeSignedTransaction",
  express.json({ type: "*/*" }),
  async (req, res) => {
    try {
      sender = req.body.sender
      receiver = req.body.receiver
      publicKeyString = req.body.public_key
      methodName = req.body.method_name
      methodArgs = req.body.method_args
      networkId = req.body.network_id
      action = req.body.action_type
      amountString = req.body.amount
      blockHash = req.body.block_hash
      nonce = req.body.nonce
      signatureDictionary = req.body.signature

      const publicKey = PublicKey.from(publicKeyString)

      // constructs actions that will be passed to the createTransaction method below
      //currently supports function call only.
      const amount = nearAPI.utils.format.parseNearAmount(amountString)
      actions = null
      if (action == "transfer") {
        actions = [nearAPI.transactions.transfer(amount)]
      } else if (action == "function_call") {
        actions = [
          nearAPI.transactions.functionCall(
            methodName,
            methodArgs,
            DEFAULT_FUNC_CALL_GAS,
            amount
          ),
        ]
      }

      // converts a recent block hash into an array of bytes
      // this hash was retrieved earlier
      // this is required to prove the tx was recently constructed (within 24hrs)
      const recentBlockHash = nearAPI.utils.serialize.base_decode(blockHash)

      const transaction = nearAPI.transactions.createTransaction(
        sender,
        publicKey,
        receiver,
        nonce,
        actions,
        recentBlockHash
      )

      const signatureArray = Object.values(signatureDictionary)
      const signatureUint8Array = Uint8Array.from(signatureArray)

      const signedTransaction = new nearAPI.transactions.SignedTransaction({
        transaction,
        signature: new nearAPI.transactions.Signature({
          keyType: transaction.publicKey.keyType,
          data: signatureUint8Array,
        }),
      })
      const signedSerializedTx = signedTransaction.encode()
      const encodedTransaction =
        Buffer.from(signedSerializedTx).toString("base64")

      res.send(encodedTransaction)
    } catch (err) {
      res.send(err)
    }
  }
)

//place holder pages for success callback urls when opening wallets from the phone

app.get("/success", express.json({ type: "*/*" }), async (req, res) => {
  res.send(
    pages.getWalletConnectionPage(true)
  );
})

//place holder pages for failure callback urls when opening wallets from the phone
app.get("/failure", express.json({ type: "*/*" }), async (req, res) => {
  res.send(
    pages.getWalletConnectionPage(false)
  );
})

app.listen(port, () => console.log(`Waiting for requests on port ${port}!`))
