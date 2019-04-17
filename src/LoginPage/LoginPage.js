// j'import React de la librairie React
import React from "react";

import { userService } from "../_services";
// import { Tapable } from "tapable";

// je déclare mon composant que j'appelle LoginPage avec la librairie React
class LoginPage extends React.Component {

  // je construis ma classe
  // avec les props qui sont les variables de mon parent
  constructor(props) {
    super(props);

    userService.logout();

    // C'est l'état de mon composant
    // j'initialise mon state qui est un objet
    this.state = {
      username: "",
      password: "",
      submitted: false,  // bollean to false
      loading: false,    // boolean to false
      error: ""
    };

    // Les méthodes du bas ont accès a this
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  /**
   * componentDidMount() est appelée immédiatement après que le composant est monté 
   * (inséré dans l’arbre).
   * C’est ici que vous devriez placer les initialisations qui requièrent l’existence 
   * de nœuds du DOM. Si vous avez besoin de charger des données depuis un point d’accès distant, 
   * c’est aussi le bon endroit pour déclencher votre requête réseau.
   */
  componentDidMount() {
    // console.log('Hey, my component is mounted');

    // déclarer un tableau
    var tab = ["Tigre", "Lion", "Jaguar", "Guépard"];

    // déclarer plusieurs objets (clé, valeur)
    var objets = {
      "felin0": "Tigre",
      "felin1": "Lion",
      "felin2": "Jaguar",
      "felin3": "Guépard"
    };
    
    // déclarer unse chaine de caractères
    let string = "Tigre";

    // déclarer un entier
    var int = 125;

    console.log("tableau : ", tab);
    console.log("objet : ", objets);
    console.log("string : ", string);
    console.log("int : ", int);
  }

  handleChange= (e) => {
    const { name, value } = e.target;
    this.setState ({
      [name]: value
    })
  }

  // gestion des évènements au changment du username
  handleUsernameChange(event) {

    // trace à la console les évènements sur chaque mise a jour du username
    // console.log('event : ', event);
    // console.log('event : ', event.target);
    // console.log("username", event.target.value);

    // setState est une méthode de l'objet State initialisé plus haut
      this.setState ({
        username: event.target.value
      })
  }

  handlePasswordChange(event) {

    // trace à la console les évènements sur chaque mise a jour du password
    // console.log("password", event.target.value);
     this.setState ({
        password: event.target.value
    })
    
  }

  // fonction flêchée handleSubmit (e) = event
  // mise au norme ES6 
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    // affiche a la console le username et le password 
    // suite au onClick=(this.handleSubmit) 
    // console.log("username : ", username);
    // console.log("password : ", password);

    function login(username, password) {
      const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        body: 'username=password&password=password'
      };
  
      return fetch(
        "http://localhost:4000/users/authenticate",
        requestOptions
      ).then(response => {
        console.log(response);
      });
    }

    function handleResponse(response) {
      return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
          if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
          }
    
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
    
        return data;
      });
    }

    function logout() {
      // remove user from local storage to log user out
      localStorage.removeItem("user");
    }
  }

  // fonction render qui a forcement un return
  // c'est la que l'on retrouve notre html et javascript
  // render a l'accès au this
  // le render est appellé avant
  // le composant componentDidMount()
  // si il y a une mise a jour alors il y a un ré-ender
  render() {
    const { username, password } = this.state;

    // console.log(this.state);

    // il attend uniquement du html et du javascript
    return (
      <React.Fragment>
        <h2>Login</h2>
        <h4>{ this.state.username }</h4> <h4>{ this.state.password }</h4>
        <form name="form">
          <label htmlFor="username">Username&nbsp;&nbsp;</label>
          <input
            type="text"
            className="form-control"
            name="username"
            // value={username}
            // onChange={this.handleChange}
            onChange={this.handleUsernameChange}
          /><br></br>
          <label htmlFor="password">Password&nbsp;&nbsp;</label>
          <input
            type="password"
            className="form-control"
            name="password"
            // value={password}
            // onChange={this.handleChange}
            onChange={this.handlePasswordChange}
          /><br></br><br></br>
          <div className="form-group">
            <button onClick={this.handleSubmit} className="btn btn-primary">Login</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export { LoginPage };
