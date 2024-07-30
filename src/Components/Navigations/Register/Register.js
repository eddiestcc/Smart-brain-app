import React from "react";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onNameChange = (e) => {
        this.setState({name: e.target.value})
    }

    onEmailChange = (e) => {
        this.setState({email: e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value})
    }

    onSubmitRegister = () => {
        if (this.state.name < 1 || this.state.email < 4 || this.state.password < 6) {
            alert('You have not filled out the form completely. Please try again.')
        } else {
            fetch('http://localhost:3000/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                })
            })
            .then(information => information.json())
            .then(user => {
                if (user){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
            
            
        }
    }

    render() {
            const { onRouteChange } = this.props;
            return(
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l tc mw6 center shadow-5">
                    <main className="pa4 black-80">
                        {/* LOGIN FORM START */}
                        <div>
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f4 fw6 ph0 mh0">Register</legend>
                                {/* NAME START  */}
                                <div className="mt3">
                                    <label 
                                        className="db fw6 lh-copy f6" 
                                        htmlFor="email-address">Name
                                    </label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="text" 
                                        name="name"    
                                        id="name"
                                        onChange={this.onNameChange}
                                    />
                                </div>
                                {/* NAME END  */}
                                {/* EMAIL START  */}
                                <div className="mt3">
                                    <label 
                                        className="db fw6 lh-copy f6" 
                                        htmlFor="email-address">Email
                                    </label>
                                    <input 
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" 
                                        name="email-address"  
                                        id="email-address"
                                        onChange={this.onEmailChange}
                                    />
                                </div>
                                {/* EMAIL END  */}
                                {/* PASSWORD START  */}
                                <div className="mv3">
                                    <label 
                                        className="db fw6 lh-copy f6" 
                                        htmlFor="password">Password
                                    </label>
                                    <input 
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password" 
                                        name="password"  
                                        id="password"
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                                {/* PASSWORD END  */}
                            </fieldset>
                            {/* LOGIN FORM END  */}
                            {/* REISTER BUTTON START  */}
                            <div className="">
                                <input 
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Register" 
                                    onClick={this.onSubmitRegister}/>
                            </div>
                            {/* REGISTER BUTTON END  */}
                        </div>
                    </main>
                </article>
            );
        }
    }
    


export default Register;