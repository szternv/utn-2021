const FormContact = document.querySelector("#FormContact");
let TablaNovedades = document.querySelector("#TablaNovedades");
let AgregarNovedad = document.querySelector("#AgregarNovedad");
let FormNovedades = document.querySelector("#FormNovedades");
let SubmitNovedad = document.querySelector("#SubmitNovedad");

function crearElementoNovedad(noticia) {
	const header = document.createElement("th")
	const title = document.createElement("td")
	const buttonEdit = document.createElement("button")
	const buttonDelete = document.createElement("button")
	const container = document.createElement("tr")
	console.log(noticia);

	header.setAttribute("scope", "row");
	header.innerHTML = noticia.id;

	title.innerHTML = noticia.titulo;
	const containerButtons = document.createElement("td")

	buttonEdit.className = "btn btn-success";
	buttonDelete.className = "btn btn-danger";
	buttonEdit.addEventListener("click", () => editarNovedades())

	buttonDelete.addEventListener("click", () => DeleteNovedad(noticia.id));
	buttonEdit.innerText = "Editar"
	buttonDelete.innerText = "Borrar"
	containerButtons.appendChild(buttonEdit)
	containerButtons.appendChild(buttonDelete)

	container.appendChild(header)
	container.appendChild(title)
	container.appendChild(containerButtons)
	return container;


};
// Get the button that opens the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeX")[0];

const PostToServer = async (url, data) => {
	if (!url) throw new Error("Url to POST is empty");
	if (!data) throw new Error("There is no data to POST");

	const response = await fetch(url, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data)
	});
	return response.json();
}

const DeleteToServer = async (url, data) => {
	if (!url) throw new Error("Url to DELETE is empty");
	if (!data) throw new Error("There is no data to DELETE");

	const response = await fetch(url, {
		method: 'DELETE',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data)
	});
	return response.json();
}



const PutToServer = async (url, data) => {
	if (!url) throw new Error("Url to PUT is empty");
	if (!data) throw new Error("There is no data to PUT");

	const response = await fetch(url, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data)
	});
	return response.json();
}

function editarNovedad(id) {
	console.log(id);
}

function borrarNovedad(id) {
	console.log(id);
}

AgregarNovedad.onclick = function () {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}

}


const GetToServer = async (url, data) => {
	if (!url) throw new Error("Url to GET is empty");
	console.log(url);
	await fetch(url)
		.then(function (response) {
			response.json().then(function (data) {
				TablaNovedades.innerHTML = "";
				data.forEach(function (noticia, id) {

					TablaNovedades.appendChild(crearElementoNovedad(noticia));

				});
			});
		})
		.catch(function (response) {
			response.json().then(function (data) {
				console.log(data);
			})
		});
}

const SendMessage = async ({
	name,
	email,
	message
}) => {
	if (!name) throw new Error("At sending the message, the Name is empty");
	if (!email) throw new Error("At sending the message, the Email is empty");
	if (!message) throw new Error("At sending the message, the Message is empty");

	return await PostToServer("/contact", {
		name,
		email,
		message
	});
}

const SendNovedad = async ({
	titulo,
	subtitulo,
	cuerpo
}) => {
	if (!titulo) throw new Error("At sending the new, the titulo is empty");
	if (!subtitulo) throw new Error("At sending the new, the subtitulo is empty");
	if (!cuerpo) throw new Error("At sending the new, the cuerpo is empty");
	await PostToServer("/novedades", {
		titulo,
		subtitulo,
		cuerpo
	});
	alert("enviado correctamente");

}


const DeleteNovedad = async(id) => {
	await DeleteToServer("/novedades", {
		id,
	});
	 window.location.reload();

}

FormContact.addEventListener("submit", e => {
	e.preventDefault();
	SendMessage({
		name: e.target.name.value,
		email: e.target.mail.value,
		message: e.target.msg.value
	});
})

FormNovedades.addEventListener("submit", e => {
	e.preventDefault();
	SendNovedad({
		titulo: e.target.titulo.value,
		subtitulo: e.target.subtitulo.value,
		cuerpo: e.target.cuerpo.value
	});
})

GetToServer("/novedades").then(function (pepito) {
	console.log("funcionó");
}).catch(function (pepito) {
	console.log("error");
})

$(document).ready(function () {

	$('ul.tabs li a:first').addClass('active');
	$('.secciones article').hide();
	$('.secciones article:first').show();

	$('ul.tabs li a').click(function () {
		$('ul.tabs li a').removeClass('active');
		$(this).addClass('active');
		$('.secciones article').hide();



		var activeTab = $(this).attr('href');
		$(activeTab).show();
		return false;


	});
});