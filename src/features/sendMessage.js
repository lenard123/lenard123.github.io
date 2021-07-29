import { ref } from 'vue'

//Lazy load firebase
const firebaseAsync = import(/* webpackChunkName: "firebase" */'@/firebase.js')

const sendMessage = async(message) => {
  const { firebase, db } = await firebaseAsync

  const messageRef = db.collection('messages').doc()
  message.createdAt = firebase.firestore.FieldValue.serverTimestamp()
  message.hasSeen = false
  await messageRef.set(message)
}

export default function(data) {

  const isSending = ref(false)

  const submitData = async() => {
    if (isSending.value) return
    try{
      isSending.value = true

      await sendMessage(data)
      alert('Message sent successfully')
    } catch (err) {
      console.log(err)
      window.alert('Sorry, the message has failed to send\nYou can also contact me here in my email: lenard.mangayayam@gmail.com')
    } finally {
      isSending.value = false
    }
  }

  return { isSending, submitData }

}