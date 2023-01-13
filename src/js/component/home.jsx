import { func } from "prop-types";
import React, { useState, useEffect, useRef } from "react";

//create your first component
const Home = () => {

	const [number, setNumber] = useState(0);
	const [list, setList] = useState([]);
	const [sonando, setSonando] = useState(false);
	const playElement = useRef(null);


	useEffect(() => {
		// console.log("Buenas");
		fetch('https://assets.breatheco.de/apis/sound/songs') //1.ir a buscar info en la url
		.then((response) => response.json()) //2.Convierte la respuesta en un json
		.then((data) => setList(data)) //3. GUarda el json en un objeto data

	},[])
	// console.log(list)

	useEffect(() => {
		if (playElement.current) {
			playElement.current.src = "https://assets.breatheco.de/apis/sound/" + list[number].url;
			playElement.current.play();
		}
	},[number])

	function playFunction(index) {
		setNumber(index);
		setSonando(true);
		playElement.current.play();
		// console.log("PLAY");
	}

	function pauseFunction() {
		setSonando(false);
		playElement.current.pause();
	}
	function subirVolumen() {
		playElement.current.volume +=0.2;
	}
	function bajarVolumen() {
		playElement.current.volume -=0.2;
	}
	const random = Math.floor(Math.random() * 21)
	// console.log(random)

	if (list.length > 0 && number >= 0) {
	return (
	<>
	<div className="bg-warning text-center">
		<audio ref={playElement} id="audioPlayer"/>
		<div className="bg-danger">
		<h1 className="text-light p-3"><strong>Audio Player</strong></h1>
		</div>
		<div className="d-flex justify-content-center">
			<ul className="list-group w-25 m-4">
				{list.map((item, index)=>
					<li className="list-group-item bg-danger" key={index}>
						<button onClick={() => playFunction(index)} className="btn btn-success w-100">{item.name}</button>
					</li>)}
			</ul>
		</div>
		<div className="d-flex justify-content-between">
			<div className="bg-danger w-50">
				<button className="btn btn-success m-2" onClick={bajarVolumen}><i className="fa fa-arrow-down"></i></button>
				<button className="btn btn-success m-2" onClick={() => (number == 0) ? setNumber(21) : setNumber(number - 1)}><i className="fa fa-backward"></i></button>
				<button className="btn btn-success m-2" onClick={() => sonando ? pauseFunction() : playFunction(number)}>{sonando ? "Pause" : "Play"}
				</button>
				<button className="btn btn-success m-2" onClick={() => (number == 21) ? setNumber(0) : setNumber(number + 1)}><i className="fa fa-forward"></i></button>
				<button className="btn btn-success m-2" onClick={subirVolumen}><i className="fa fa-arrow-up"></i></button>
			</div>
			<div className="bg-danger w-50">
				<button className="btn btn-success m-2" onClick={() => setNumber(random)}>Random</button>
				{/* <input type="checkbox" id="input" onChange/>
				<label class="form-check-label text-light" for="input">
				Repeat
				</label> */}
			</div>
		</div>
	</div>
	</>
	);
}
return <div>Loading...</div>
};

export default Home;
