function loadXMLDoc () {
    var url = "https://my.api.mockaroo.com/users.json?key=22fd8a30";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            document.getElementById("demo").style.display = "block";
            table_body = document.querySelector("tbody");
            table_body.innerHTML="";
            
            for(let item of JSON.parse(xhr.responseText)){
                var tr = document.createElement('tr');

                for(var value in item){
                    console.log(value, item)
                    td = document.createElement('td');
                    textSummary = document.createTextNode(item[value]);
                    td.appendChild(textSummary);
                    tr.appendChild(td);
                }

                table_body.appendChild(tr);
            }
        }
    };

    xhr.send();
}