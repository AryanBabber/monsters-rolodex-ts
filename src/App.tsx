import { useState, useEffect, ChangeEvent } from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

import "./App.css";
import { getData } from "./utils/data.utils";

export type Monster = {
	id: string;
	name: string;
	email: string;
};

const App = () => {
	const [searchField, setSearchField] = useState("");
	const [monsters, setMonsters] = useState<Monster[]>([]);
	const [filteredMonsters, setFilteredMonsters] = useState(monsters);

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getData<Monster[]>(
				"https://jsonplaceholder.typicode.com/users"
			);
			setMonsters(users);
		};
		fetchUsers();
	}, []);

	useEffect(() => {
		const newFilteredMonsters = monsters.filter((m) => {
			return m.name.toLocaleLowerCase().includes(searchField);
		});
		setFilteredMonsters(newFilteredMonsters);
	}, [monsters, searchField]);

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const sfs = e.target.value.toLocaleLowerCase();
		setSearchField(sfs);
	};

	return (
		<div className="App">
			<h1>Monsters Rolodex</h1>

			<SearchBox
				className="monsters-search-box"
				onChangeHandler={onSearchChange}
				placeholder="search monsters"
			/>
			<CardList monsters={filteredMonsters} />
		</div>
	);
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(users => this.setState({ monsters: users }));
//   }

//   onSearchChange = event => {
//     this.setState({ searchField: event.target.value });
//   };

//   render() {
//     const {  monsters, searchField } = this.state;
//     const filteredMonsters = monsters.filter(monster =>
//       monster.name.toLowerCase().includes(searchField.toLowerCase())
//     );

//     return (
//       <div className='App'>
//         <h1>Monsters Rolodex</h1>
//         <SearchBox onSearchChange={this.onSearchChange} />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
