import { db, FieldValue } from './index.js'
import { useStore } from 'vuex'


export const sendMessage = async(message) => {
    const messageRef = db.collection('messages').doc()
    message.createdAt = FieldValue.serverTimestamp()
    message.hasSeen = false
    await messageRef.set(message)
}

export const seenMessage = async(email) => {
    const store = useStore()
    const batch = db.batch()
    let unSeenMessage = 0

    store.state.messages.forEach(message => {
        if (message.email === email && !message.hasSeen) {
            const messageRef = db.collection('messages').doc(message.id)
            unSeenMessage++
            batch.update(messageRef, {hasSeen: true})
        }
    })

    if (unSeenMessage > 0) await batch.commit()
}

let messageSubscription = null
export const onMessageChanged = (cb) => {
    if (messageSubscription) unsubcribeToMessage()
    messageSubscription = db.collection('messages').orderBy('createdAt', 'desc').onSnapshot(cb)
}

export const unsubcribeToMessage = () => {
    if (messageSubscription) messageSubscription()
    messageSubscription = null
}