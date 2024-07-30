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
 const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    email: '',
    id: '',
    name: '',
    entries: 0,
    joined: '',
  }
}

class App extends Component {
    constructor() {
      super();
      this.state = initialState;
    }

    loadUser = (data) => {
      this.setState({user: {
          email:  data.email,
          id: data.id,
          name:  data.name,
          entries:  data.entries,
          joined:  data.joined,
        }
      })
    }

    calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const clarifaiFaceArray = data.outputs[0].data.regions
      clarifaiFaceArray.forEach((face, i )=> {
          console.log(data.outputs[0].data.regions[i].id,face.region_info.bounding_box)
      })
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
            fetch('http://localhost:3000/imageurl', {
              method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  input: this.state.input
          })
        })
        .then(response => response.json())
        .then(response => {
          if (response) {
            fetch('http://localhost:3000/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
        };
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
     };

     onRouteChange = (route) => {
      if (route === 'signin') {
        this.setState({isSignedIn: false});
        this.setState(initialState);
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
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageURL={imageURL}/>
           </div>
          : (this.state.route === 'signin'
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }
}

export default App;
