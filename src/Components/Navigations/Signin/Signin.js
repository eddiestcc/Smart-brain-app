const Signin = ({onRouteChange}) => {
    return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l tc mw6 center shadow-5">
            <main className="pa4 black-80">
                {/* LOGIN FORM START */}
                <div>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        {/* EMAIL START  */}
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" name="email-address"  id="email-address"/>
                        </div>
                        {/* EMAIL END  */}
                        {/* PASSWORD START  */}
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="password" name="password"  id="password"/>
                        </div>
                        {/* PASSWORD END  */}
                    </fieldset>
                    {/* LOGIN FORM END  */}
                    {/* SIGN IN BUTTON START  */}
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" value="Sign in" onClick={() => onRouteChange('home')}/>
                    </div>
                    {/* SIGN IN BUTTON END  */}
                    {/* REGISTRATION START  */}
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register')} className="f6 link dim black pointer db">Register</p>
                    </div>
                    {/* REGISTRATION END  */}
                </div>
            </main>
        </article>
    )
}

export default Signin;