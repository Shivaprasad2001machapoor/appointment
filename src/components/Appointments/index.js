import {Component} from 'react'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    showStarredOnly: false,
  }

  onChangeTitleInput = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      date: event.target.value,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date, appointmentsList} = this.state

    const newAppointment = {
      id: Date.now(),
      title,
      date,
      isStarred: false,
    }

    this.setState({
      title: '',
      date: '',
      appointmentsList: [...appointmentsList, newAppointment],
    })
  }

  toggleIsStarred = id => {
    const {appointmentsList, showStarredOnly} = this.state

    const updatedAppointmentsList = appointmentsList.map(appointment => {
      if (appointment.id === id) {
        return {...appointment, isStarred: !appointment.isStarred}
      }
      return appointment
    })

    this.setState({
      appointmentsList: updatedAppointmentsList,
    })

    if (showStarredOnly) {
      this.toggleShowStarredOnly()
    }
  }

  toggleShowStarredOnly = () => {
    this.setState(prevState => ({
      showStarredOnly: !prevState.showStarredOnly,
    }))
  }

  renderTitlesList = () => {
    const {appointmentsList, showStarredOnly} = this.state

    const filteredAppointments = showStarredOnly
      ? appointmentsList.filter(appointment => appointment.isStarred)
      : appointmentsList

    return filteredAppointments.map(eachAppointment => (
      <li>
        <AppointmentItem
          key={eachAppointment.id}
          appointmentDetails={eachAppointment}
          toggleIsStarred={this.toggleIsStarred}
        />
      </li>
    ))
  }

  render() {
    const {title, date, showStarredOnly} = this.state
    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Add Appointment</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddAppointment}>
              <label htmlFor="title" className="form-description">
                Title
              </label>
              <input
                type="text"
                className="title-input"
                placeholder="Title"
                value={title}
                id="title"
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="date" className="form-description">
                Date
              </label>
              <input
                type="date"
                className="date-input"
                value={date}
                id="date"
                onChange={this.onChangeDateInput}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="bottom-container">
            <h1 className="appointments">Appointments</h1>
            <button
              type="button"
              className={`button ${showStarredOnly ? 'active' : ''}`}
              onClick={this.toggleShowStarredOnly}
            >
              Starred
            </button>
          </div>
          <ul className="comments-list">{this.renderTitlesList()}</ul>
        </div>
      </div>
    )
  }
}

export default Appointments
