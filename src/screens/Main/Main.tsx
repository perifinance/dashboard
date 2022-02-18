import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Header from '../Header' 
import Stake from 'pages/Stake'
import Dex from 'pages/Dex'
import Pynths from 'pages/Pynths'

const Main = () => {
    return <div className="bg-navy-700 h-full xl:h-screen text-white font-light">
        <div className="2xl:container py-4 xl:pt-6 2xl:pt-14 mx-auto">
            <Router>
                <Header></Header>
                <div className="py-4 lg:max-w-screen-xl xl:pt-6 2xl:pt-14 mx-auto">
                    <Switch>
                        <Route path="/stake">
                            <Stake></Stake>
                        </Route>
                        <Route path="/dex">
                            <Dex></Dex>
                        </Route>
                        <Route path="/pynths">
                            <Pynths></Pynths>
                        </Route>
                        <Redirect to="/stake"></Redirect>
                    </Switch>
                </div>
            </Router>
        
        </div>
</div>
}
export default Main;