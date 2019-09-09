import React from 'react';
import './App.css'

import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { FaDrum } from 'react-icons/fa';
import className from 'classnames'
import { CustomInput, FormGroup, Label } from 'reactstrap';

const bank1 = [{
  name:'Q',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  display:'Heater 1',
  keyCode:81,
},
{
  name:'W',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  display:'Heater 2',
  keyCode:87,
},
{
  name:'E',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  display:'Heater 3',
  keyCode:69,
},
{
  name:'A',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  display:'Heater 4',
  keyCode:65,
},
{
  name:'S',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  display:'Calp',
  keyCode:83,
},
{
  name:'D',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  display:'Open HH',
  keyCode:68,
},
{
  name:'Z',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  display:'Kick n\'\ Hat',
  keyCode:90,
},
{
  name:'X',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  display:'Kick',
  keyCode:88,
},{
  name:'C',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  display:'Close HH',
  keyCode:67,
}]

export default class Example extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      on: true,
      bank: true,
      display :'',
      volumeValue: 30,
    }
    this.on = this.on.bind(this);
    this.bank = this.bank.bind(this);
    this.audio = this.audio.bind(this);
    this.setKeyCode = this.setKeyCode.bind(this);
    this.volume = this.volume.bind(this);
  }

on(){
  this.setState ({
    on: !this.state.on,
    display: ''
  })
}

bank(){
  this.setState ({
    bank: !this.state.bank
  })
}

audio(sukien){
  for( let i = 0 ; i < 9 ; i ++ )
  {
    if( bank1[i].name === sukien.target.value && this.state.on)
    {
      var audio = new Audio(bank1[i].url);
      audio.volume = this.state.volumeValue/100;
      var display = bank1[i].display;
      this.setState({
        display: display
      })
      return audio.play();
    }
    else if(this.state.on === false)
    {
      return -1;
    }
  }
}

componentDidMount (){
  document.addEventListener("keydown", this.setKeyCode);
}

componentWillUnmount() {
  document.removeEventListener('keydown', this.setKeyCode);
}

setKeyCode(sukien){
  for( let i = 0 ; i < 9 ; i ++ )
  {
    if( bank1[i].keyCode === sukien.keyCode && this.state.on)
    {
      var audio = new Audio(bank1[i].url);
      audio.volume = this.state.volumeValue/100;
      var display = bank1[i].display;
      this.setState({
        display: display
      })
      return audio.play();
    }
    if(this.state.on === false || i>8)
    {
      return -1;
    }
  }
}

volume(sukien){
  if(this.state.on)
  {  this.setState({
    display : 'Volume : ' + sukien.target.value,
    volumeValue : sukien.target.value
  })
}
else{
  this.setState({
    volumeValue : sukien.target.value
})
}
}

  render() {
    const { on , bank ,display } = this.state;

    return (
      <Container id="drum-machine">
        <Container className='total-drum'>
        <Row>
          <Col sm='4'><Button className = 'drum-pad' color="secondary" onClick={this.audio} value ='Q' >Q</Button>{' '}</Col>
          <Col sm='4'><Button className = 'drum-pad' color="secondary" onClick={this.audio} value ='W' >W</Button>{' '}</Col>
          <Col sm='4'><Button className = 'drum-pad' color="secondary" onClick={this.audio} value ='E' >E</Button>{' '}</Col>
        </Row>
        <Row>
          <Col sm='4'><Button className = 'drum-pad' color="secondary" onClick={this.audio} value ='A' >A</Button>{' '}</Col>
          <Col sm='4'><Button className = 'drum-pad' color="secondary" onClick={this.audio} value ='S' >S</Button>{' '}</Col>
          <Col sm='4'><Button className = 'drum-pad' color="secondary" onClick={this.audio} value ='D' >D</Button>{' '}</Col>
        </Row>
        <Row>
          <Col sm='4'><Button className = 'drum-pad' color="secondary" onClick={this.audio} value ='Z' >Z</Button>{' '}</Col>
          <Col sm='4'><Button className = 'drum-pad' color="secondary" onClick={this.audio} value ='X' >X</Button>{' '}</Col>
          <Col sm='4'><Button className = 'drum-pad' color="secondary" onClick={this.audio} value ='C' >C</Button>{' '}</Col>
        </Row>
        </Container>
        <div id='display'>
          <div id='title'>
            <p> Drum Simulater <FaDrum /> </p>
          </div>
          <div id='total-on-off'>
            <h3>Power</h3>
            <div id='on-off1' onClick = {this.on}>
               <div className={className('on-off',{'on':on === true})}/>
               <div className={className('on-off',{'on':on === false})}/>
            </div>
          </div>
          <div id='screen'>
          {display}
          </div>
          <FormGroup id='form'>
          <Label for="exampleCustomRange" className='label'>Volume</Label>
          <CustomInput 
          onChange = {this.volume}
          type="range" id="exampleCustomRange" name="customRange" className='volume'/>
        </FormGroup>
          <div id='bank'>
            <h3>Bank</h3>
            <div id='on-off2' onClick = {this.bank}>
               <div className={className('on-off',{'on':bank === true})}/>
               <div className={className('on-off',{'on':bank === false})}/>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}