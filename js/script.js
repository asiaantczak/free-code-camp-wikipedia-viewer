
var dataApi = {
	getSearchResult: function() {
		
		var searchInput = document.getElementById('keyWord');
		var keyWord = searchInput.value;
		
		
		var wikipediaRequest = new XMLHttpRequest();

		wikipediaRequest.open('GET', "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + keyWord);
		

		wikipediaRequest.onload = function() {
		var jsonData= JSON.parse(wikipediaRequest.responseText);
		
		dataApi.displayResults(jsonData.query.search);
		}
		wikipediaRequest.send();
		searchInput.value='';
	},
	displayResults: function (data) {
				
		var searchResults= document.getElementById('results');
		searchResults.innerHTML ='';

		for (var i =0; i < data.length; i++) {
		var searchResult= document.createElement('li');
		searchResult.id = i;
		searchResult.className="listItem";

		var frag= document.createDocumentFragment();

		var link = document.createElement('a');
		var title = document.createElement('h2');
		var paragraph = document.createElement('p');
		
		
		title.innerHTML= data[i].title;
		link.href= "https://en.wikipedia.org/wiki/" + title.innerHTML;
		link.target = '_blank';
		link.appendChild(title);

		paragraph.innerHTML=data[i].snippet;

		frag.appendChild(link);
		frag.appendChild(paragraph);
		searchResult.appendChild(frag);
		searchResults.appendChild(searchResult);
		}
	},
}


/****************** DISPLAY SEARCH RESULTS/ CHANGE LAYOUT*****************************/
var searchButton=document.querySelector('i');
var input = document.querySelector('input');
searchButton.addEventListener('click', function() {
	if (input.value === '') {
		alert('Your input is empty! Add text you are looking for!') 
	} else {
		document.getElementById('change').classList.remove("container");
		document.getElementById('change').classList.add("container2");
		document.querySelector('ul').style.display= "block";
		dataApi.getSearchResult();
	}
});
 
input.addEventListener('keydown', function(e) {
	if (e.keyCode === 13) {
		if (input.value === '') {
			alert('Your input is empty! Add text you are looking for!') 
		} else {
			document.getElementById('change').classList.remove("container");
			document.getElementById('change').classList.add("container2");
			document.querySelector('ul').style.display= "block";
			dataApi.getSearchResult();
		}
	}
});

/************************** CLEAR SEARCH RESULTS/ CHANGE LAYOUT **********************************************/
var clearButton=document.getElementById("clearButton");
clearButton.addEventListener('click', function() {
	document.querySelector('ul').style.display= "none";
	document.getElementById('change').classList.remove("container2");
	document.getElementById('change').classList.add("container");
});

	
	
	