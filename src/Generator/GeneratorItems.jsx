import React, { Component } from 'react'
import { SegmentGroup, Segment, Input, Button, Label } from 'semantic-ui-react'
import Gen from './Gen'
import data from './genData'

export default class GeneratorItems extends Component {

  state = {
    length: 4,
    passGen: data,
    password: '',
    uc: false,
    lc: true,
    num: false,
    sym: false,
  }

  handleInputChange = (evt) => {
    this.setState({
      length: evt.target.value
    })
  }

  handleGenerate = () => {
    this.state.passGen.map(data => {
      if(data.isChecked === true){
        this.generatePassword(data.name)
        return data.name
      } else return ''
    })
  }

  generatePassword = (name) => {
    var length = this.state.length; 

    if(name === 'uppercase') {
      this.setState({
        uc: true
      })
    } 
    
    if(name === 'lowercase') {
      this.setState({
        lc: true
      })
    } 
    
    if(name === 'numbers') {
      this.setState({
        num: true
      })

    } 

    if(name === 'symbols') {
      this.setState({
        sym: true
      })

    }

    var generator = require('generate-password')
    var passl = generator.generate({
      uppercase: this.state.uc,
      lowercase: this.state.lc,
      numbers: this.state.num,
      symbols: this.state.sym,
      length: length,
    })

    this.setState({
      password: passl
    })
  }

  handleToggle = (id) => {
    this.setState(prevState => {
      const updatedData = prevState.passGen.map(data => {
        if(data.id === id) {
          data.isChecked = !data.isChecked
        }
        return data
      })
      return {
        passGen: updatedData
      }
    })
  }

  handleSave = () => {

    var copyText = this.state.password
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    
  }

  render() {

    const outerContainer = {
      backgroundColor: '#7DDCFB',
      width: '35%',
      marginTop: '30px',
      marginLeft: '30%',
      border: '1px solid black'
    }
  
    const headerContainer = {
      marginLeft: '15%',
      backgroundColor: '#7DDCFB',
    }

    const outputContainer = {
      backgroundColor: '#7DDCFB',
      padding: '10px',
    }

    const inputStyle = {
      padding: '10px',
      width: '60%',
      marginLeft: '40px',
      paddingRight: '50px' 
    }

    const genButtonStyle = {
      height: '50px',
      width: '30%',
      margin: '0 0 0 150px',
      backgroundColor: 'blue',
      color: 'white'
    }

    const numberInputStyle = {
      paddingLeft: '40%',
    }

    const labelStyle = {
      width: '35%',
      height: '40px',
      marginLeft: '20px',
      paddingRight: '40px',
      marginBottom: '20px'
    }

    const settingContainer = {
      backgroundColor: '#7DDCFB'
    }

    const buttonContainerStyle = {
      backgroundColor: '#72D8F8',
    }

    const saveButtonStyle = {
      backgroundColor: 'blue',
      color: 'white'
    }

    const genData = data.map(item => <Gen 
      key = {item.id} 
      item = {item} 
      handleToggle = {this.handleToggle} 
    />)

    return (
     <SegmentGroup style = {outerContainer} >
       <Segment style = {headerContainer} >
        <h2> PASSWORD GENERATOR </h2>
       </Segment>
       <Segment style = {outputContainer}>
        <Input 
          style = {inputStyle} 
          disabled
          value = {this.state.password}
        />
        <Button 
          content = 'copy' 
          style = {saveButtonStyle}
          onClick = {() => navigator.clipboard.writeText(this.state.password)}
        />
       </Segment>
       <Segment style = {settingContainer}>
         <Label style = {labelStyle} > PASSWORD LENGTH </Label>
         <Input 
          style = {numberInputStyle} 
          type = 'number' 
          name = 'length'
          min = '4' 
          max = '15' 
          value = {this.state.length}
          onChange = {this.handleInputChange}
        />
         {genData}
       </Segment>
       <Segment style = {buttonContainerStyle} >
         <Button 
          content = 'Generate' 
          style = {genButtonStyle} 
          onClick = {this.handleGenerate}
        />
       </Segment>
     </SegmentGroup>
    )
  }
}