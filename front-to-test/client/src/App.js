import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
    };
  }

  clickName() {
    let name = document.getElementById("name_text");
    axios.post("http://localhost:8000/test", {
      name: name.value
    })
    .then((response) => {
      console.log("deu bom");
      console.log(response.data);
    })
    .catch(function (error) {
      console.log("deu ruim: ", error);
    });
  }

  signIn() {
    let login = document.getElementById("login_text");
    let pass = document.getElementById("pass_text");

    axios.post("http://localhost:8000/login/paciente", {
      login: login.value,
      pass: pass.value
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  facebook() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let birthdate = document.getElementById("birthdate");
    let fbid = document.getElementById("fbid");

    axios.post("http://localhost:8000/paciente/facebook/new", {
      name: name.value,
      email: email.value,
      birthdate: birthdate.value,
      fbId: fbid.value
    })
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });    
  }

  // TESTES DIRETO NO BOTAO
  addPacient() {
    axios.post("http://localhost:8000/paciente/new", {
      cpf: "43044075890",
      email: "teste@teste.com",
      name: "Testando",
      birthdate: "2002-05-11",
      password: "123",
      phoneNumber: "1933231132",
      gender: "M"
    })
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  } 
  
  addDoctor() {
    axios.post("http://localhost:8000/medico/new", {
      crm: "11111",
      email: "teste@teste.com",
      name: "Abobrinha",
      birthdate: "2002-05-11",
      password: "123",
      gender: "M",
      phoneNumber: "1934561234"
    })
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  addDoctorWorkLocation() {
    axios.post("http://localhost:8000/medico/maps/add", {
      crm: "11111",
      maps: "UniMetrocamp Campinas"
    })
    .then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }
  
  addDoctorSignin() {
    axios.post("http://localhost:8000/login/medico", {
      login: "11111",
      pass: "123"
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  render() {
    return (
      <div className="container">
        <div>
          <input type="text" id="name_text"/>
          <input type="button" value="Clica aqui" onClick={() => this.clickName()}/>
        </div>
        <div>
          <input type="text" id="login_text" placeholder="Login"/>
          <input type="password" id="pass_text" placeholder="Senha"/>
          <input type="button" value="Clica aqui" onClick={() => this.signIn()}/>
        </div>
        <div>
          <input type="text" id="name" placeholder="Nome"/>
          <input type="text" id="email" placeholder="Email"/>
          <input type="text" id="birthdate" placeholder="Data"/>
          <input type="text" id="fbid" placeholder="FBID"/>
          <input type="button" value="Clica aqui" onClick={() => this.facebook()}/>
        </div>
        <div>
          <input type="button" value="Cadastra paciente" onClick={() => this.addPacient()}/>
          <input type="button" value="Cadastra médico" onClick={() => this.addDoctor()}/>
          <input type="button" value="Adicionar local de trabalho do médico" 
            onClick={() => this.addDoctorWorkLocation()}/>
          <input type="button" value="Login médico" onClick={() => this.addDoctorSignin()}/>
        </div>
      </div>
    );
  }
}

export default App;
