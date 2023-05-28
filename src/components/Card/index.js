import './index.css'

const Card = props => {
    const {details} = props
    const {department, designation, description, date } = details

    return(
        <div className='card'>
            <p className='card-heading'>{department ? department : designation}</p>
            <p className='card-description'>{description}</p>
            <p className='card-date'>{date}</p>
        </div>
    )
}

export default Card