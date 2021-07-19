import moment from 'moment'

export default (createdAt) => {
    return createdAt ? 
        moment(createdAt.toDate()).format('D MMMM YYYY') : 
        'Unknown date'
}