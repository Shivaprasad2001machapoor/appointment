import './index.css'

const AppointmentItem = ({appointmentDetails, toggleIsStarred}) => {
  const {title, date, isStarred, id} = appointmentDetails

  return (
    <li className="appointment-item">
      <div className="appointment-details">
        <h3>{title}</h3>
        <p>{date}</p>
      </div>
      <button
        type="button"
        className={`star-button ${isStarred ? 'starred' : ''}`}
        onClick={() => toggleIsStarred(id)}
        data-testid="star"
      >
        <img
          src={
            isStarred
              ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
          }
          alt="star"
        />
      </button>
    </li>
  )
}

export default AppointmentItem
