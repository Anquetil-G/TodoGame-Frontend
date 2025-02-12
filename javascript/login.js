const editCurrentMonster = async (res) => {
	const random = Math.random();
	let futureMonster;
	if (random < 0.6) {
		futureMonster = (0*11) + Math.floor(Math.random() * 11) + 1;
	} else if (random < 0.9) {
		futureMonster = (1*11) + Math.floor(Math.random() * 11) + 1;
	} else {
		futureMonster = (2*11) + Math.floor(Math.random() * 11) + 1;
	};
	const body = {
		currentMonster: futureMonster
	}
	await axios.put(`http://localhost:5000/user/editCurrentMonster/${res.data._id}`, body)
	window.location.href = "./index.html";
}

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const body = {
    email: e.target[0].value,
    password: e.target[1].value,
	};
	axios.post("http://localhost:5000/user/", body)
		.then((res) => {
			localStorage.setItem("email_ToDoListApp_8435976127", res.data.email);
			localStorage.setItem("password_ToDoListApp_8435976127", res.data.password);
			localStorage.setItem("id_ToDoListApp_8435976127", res.data._id);
			if (res.data.currentMonster === 0) {
				editCurrentMonster(res);
			} else {
				window.location.href = "./index.html";
			}
		})
		.catch((err) => {
			errorMessage.innerHTML = `<p>*${err.response.data.message}</p>`;
			errorMessage.style.color = "#C83C3C";
		});
});