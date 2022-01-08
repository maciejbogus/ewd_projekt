function JSONtoData(arr, key){
	const result = [];
	for(var i in arr){
		var count = 0;
		const innerArray = []
		for (var j = 0; j < arr.length; j++) {
			if (arr[j][key] == arr[i][key]) {
				count++;
			}
		};
		innerArray.push(arr[i][key], count);
		result.push(innerArray)
	}
	console.log(result);
	return result;
}

function loadXMLDoc () {
    var url = "https://my.api.mockaroo.com/users.json?key=22fd8a30";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4) {
			//FORMATOWANIE TABELI, DO WYŚWIETLENIA POBRANYCH DANYCH
            document.getElementById("demo").style.display = "block";
            const table_body = document.querySelector("tbody");
            table_body.innerHTML="";
            var header = true;

            for(let item of JSON.parse(xhr.responseText)){
				
                var tr = document.createElement('tr');
				const table_head = document.getElementById("table_head")


                for(var value in item){
					if(header == true){
						//JEDNOKROTNE WPISANIE TYTUŁÓW DO NAGŁÓWKÓW 
						th = document.createElement('th');
						headerName = document.createTextNode(value.toUpperCase());
                    	th.appendChild(headerName);
						table_head.appendChild(th);
					}

					//TWORZENIE KOMÓREK Z POBRANYMI DANYMI
                    td = document.createElement('td');
                    textSummary = document.createTextNode(item[value]);
                    td.appendChild(textSummary);
                    tr.appendChild(td);
                }
				header = false;

                table_body.appendChild(tr);
            }

			// TWORZENIE WYKRESÓW
			var file = JSON.parse(xhr.responseText)
			const data1 = JSONtoData(file, 'gender')
			const data2 = JSONtoData(file, 'favourite_colour')

			var chart1 = bb.generate({
				data: {
					columns: data1,
					type: "bar",
				},
				bindto: "#chart1"
			});
			
			var chart2 = bb.generate({
				data: {
					columns: data2,
					type: "pie",
				},
				bindto: "#chart2"
			});

			// WSTAWIENIE TYTUŁÓW WYKRESÓW
			document.getElementById("chart1_title").innerHTML = "Płeć"
			document.getElementById("chart2_title").innerHTML = "Ulubiony kolor"
        }
    };
    xhr.send();
}	