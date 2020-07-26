import React, { Component } from 'react'
import { Container, Label, Checkbox } from 'semantic-ui-react'

class Gen extends Component {
  
  submitSettingsData = () => {
    if(this.props.item.isChecked === true ) {
      console.log(this.props.item.name)
    }
  }


  render() {
    const containerStyle = {
      display: 'flex',
      backgroundColor: '#7DDCFB',
    }

    const labelStyle = {
      width: '35%',
      height: '40px',
      marginLeft: '20px',
      paddingRight: '40px',
      marginBottom: '20px',
    }
    
    const checkboxStyle = {
      paddingLeft: '40%',
    }

    const {id, label, isChecked} = this.props.item
    const {handleToggle} = this.props

    return (
      <Container style = {containerStyle} >
        <Label style = {labelStyle}  name = 'label'> {label} </Label>
        <Checkbox 
          style = {checkboxStyle}  
          toggle 
          checked = {isChecked}
          onChange = {() => handleToggle(id)}
        />
      </Container>
    )
  }
}

export default Gen