import { uploadImage } from './image.js'
import { db, FieldValue } from './index.js'

export const addProject = async({name, description, details, image, status, tags}) => {

  const projectRef = db.collection('projects').doc()
  const detailsRef = projectRef.collection('details').doc('details')

  const batch = db.batch()

  batch.set(projectRef, {
    name, 
    description, 
    details,
    status,
    tags,
    createdAt: FieldValue.serverTimestamp(),
    image: await uploadImage(image)
  })
  batch.set(detailsRef, {value: details})

  await batch.commit()
}

export const updateProject = async({id, name, description, details, image, status, tags}) => {
  const projectRef = db.collection('projects').doc(id)
  const detailsRef = projectRef.collection('details').doc('details')

  const batch = db.batch()

  batch.update(projectRef, {
    name, description, details, status, tags, image: await uploadImage(image)
  })
  batch.set(detailsRef, {value: details})

  await batch.commit()
}

export const fetchProjects = async() => {
  const snapshot = await db.collection('projects').orderBy('createdAt', 'desc').get()

  return snapshot.docs.map((doc) => ({
    id:doc.id,
    ...doc.data()
  }))
}

export const fetchProject = async(id) => {

  const request = await Promise.all([
    db.collection('projects').doc(id).get(),
    db.collection('projects').doc(id).collection('details').doc('details').get()
  ])

  const [project, details] = request

  return { 
    id,
    details: details.data().value,
    ...project.data()
  }

}

export const fetchPublishedProjects = async() => {
  const snapshot = await db.collection('projects')
    .where('status', '==', 'published')
    .orderBy('createdAt', 'desc')
    .get()

  return snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}))
}