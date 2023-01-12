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
	console.log(list)

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
		console.log("PLAY");
	}
	function pauseFunction() {
		setSonando(false);
		playElement.current.pause();
	}
	if (list.length > 0 && number >= 0 && number < list.length) {
	return (
	<>
	<div className="bg-warning text-center">
		<audio ref={playElement} id="audioPlayer"/>
		<h1 className="text-light pt-3"><strong>Audio Player</strong></h1>
		<div className="d-flex justify-content-center">
			<ul className="list-group w-25 m-4">
				{list.map((item, index)=>
					<li className="list-group-item bg-danger" key={index}>
						<button onClick={() => playFunction(index)} className="btn btn-success w-100">{item.name}</button>
					</li>)}
			</ul>
		</div>
		<div className="d-flex justify-content-center bg-danger">
			<button className="btn btn-success m-2" onClick={() => (number == 0) ? setNumber(21) : setNumber(number - 1)}><i className="fa fa-backward"></i></button>
			<button className="btn btn-success m-2" onClick={() => sonando ? pauseFunction() : playFunction(number)}>{sonando ? "Pausar" : "Play"}
			</button>
			<button className="btn btn-success m-2" onClick={() => (number == 21) ? setNumber(0) : setNumber(number + 1)}><i className="fa fa-forward"></i></button>
		</div>
	</div>
	</>
	);
}
return <div>Loading...</div>
};

export default Home;
