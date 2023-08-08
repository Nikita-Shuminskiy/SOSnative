import {FlatList} from "react-native";


export const VirtualizedList = ({ children, ...rest }) => {
	return <FlatList style={{  width: '100%' } } data={[]} renderItem={null} { ...rest } ListHeaderComponent={<>{children}</>} />
}
