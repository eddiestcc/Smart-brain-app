import {React, Component} from 'react';
import Signin from './Components/Navigations/Signin/Signin.js';
import Register from './Components/Navigations/Register/Register.js';
import Nav from './Components/Navigations/Nav/Nav.js';
import Logo from './Components/Home/Logo/Logo.js';
import Rank from './Components/Home/Rank/Rank.js';
import ImageLinkForm from './Components/Home/Image Link Form/ImageLinkForm.js';
import FaceRecognition from './Components/Home/FaceRecognition/FaceRecognition.js';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';

// PRE-RENDER
const app = new Clarifai.App({
  apiKey: '8b19a79c564444c4a04d791426c66493'
 });

class App extends Component {
    constructor() {
      super();
      this.state = {
        input: '',
        imageURL: '',
        box: {},
        route: 'signin',
        isSignedIn: false
      }
    }

    calculateFaceLocation = (data) => {
     
      const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      console.log(data,'data');
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      console.log(width,height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
   }

   displayFaceBox = (box) => {
      this.setState({box: box})
   }

    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
      this.setState({imageURL: this.state.input});
      app.models
      .predict(
        'face-detection',
      // THE JPG
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
     };

     onRouteChange = (route) => {
      if (route === 'signin') {
        this.setState({isSignedIn: false})
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
     }


// RENDER AREA
    render() {
    const { isSignedIn, route, box, imageURL } = this.state;
    return (
      <div className='App'>
        {/* BACKGROUND  */}
        <ParticlesBg type="polygon" bg={true} />
        <Nav isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

        {route === 'home' 
        ? <div> {/* HOME PAGE  */}
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageURL={imageURL}/>
           </div>
          : (this.state.route === 'signin'
          ? <Signin onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }
}

export default App;
