import { useState } from "react";
import { addDoc, collection, FieldValue, getFirestore, serverTimestamp } from 'firebase/firestore/lite';
import { db } from "./Firebase";

export function useMessage({onSuccess, onError})
{
    const [isSending, setIsSending] = useState(false)

    const sendMessage = async (message) => {
        if (isSending) return;

        setIsSending(true)
        //await sendMessage
        try {
            const data = await addDoc(collection(db, 'messages'), {
                ...message,
                createdAt: serverTimestamp(),
                hasSeen: false
            })
            onSuccess(data)
        } catch (error) {
            onError(error)
        } finally {
            setIsSending(false)
        }
    }

    return { isSending, sendMessage }
}