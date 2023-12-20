import {StatusBar} from 'expo-status-bar';
import RootNavigation from "./src/navigation/RootNavigation";
import {FontsWrapper} from "./src/components/FontsWrapper";



export default function App() {

    return (


        <FontsWrapper>
            <StatusBar hidden={false} style={'auto'} animated={true} translucent={true}/>
            <RootNavigation/>
        </FontsWrapper>
    );
}

