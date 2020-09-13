const leerData = fetch(
    'https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json'
).then((resp) => resp.json()).then(mostrarData);

var listaEvents = new Array();
var numFilas = 0;
var numSquirrel = 0;

function mostrarData(array)
{
    for(let i = 0; i < array.length; i++)
    {
        numFilas = array.length;
        var events;
        var squirrel;

        const fila = document.createElement("tr");

        const idFila = document.createElement("th");
        idFila.scope = "row";
        idFila.textContent = (i+1) + "";

        const eventsFila = document.createElement("td");

        var obj = array[i];
        for(var key in obj)
        {
            var name = key;
            var value = (obj[key]);
            if(name == "events")
            {
                events = value;
            }
            else if(name == "squirrel")
            {
                squirrel = value;
            }
        }

        for(let j = 0; j < events.length; j++)
        {
            if(j == events.length-1) eventsFila.textContent += events[j];
            else eventsFila.textContent += (events[j] + ", ");

            const yaExiste = listaEvents.find(element => element.getName == events[j]);
            if(yaExiste != null)
            {
                if(squirrel == false) {yaExiste.setFn();}
                else {yaExiste.setTp();}
            }
            else
            {
                var nuevo = new Event(events[j]);
                if(squirrel == false) {nuevo.setFn();}
                else {nuevo.setTp();}
                listaEvents.push(nuevo);
            }
        }

        const columnaSquirrel = document.createElement("td");
        columnaSquirrel.textContent = squirrel + "";

        if (squirrel == true) 
        {
            fila.className = "table-danger";
            numSquirrel++;
        }

         fila.appendChild(idFila);
         fila.appendChild(eventsFila);
         fila.appendChild(columnaSquirrel);

         const tabla1 = document.querySelector(".tabla1");
         tabla1.appendChild(fila);
    }

    function compare(a, b) 
    {
        if (a.getMcc < b.getMcc) 
        {
            return 1;
        }
        if (a.getMcc > b.getMcc) 
        {
            return -1;
        }
        return 0;
    }
    
    listaEvents.sort(compare);

    for(let i = 0; i < listaEvents.length; i++)
    {
        const fila = document.createElement("tr");

        const idFila = document.createElement("th");
        idFila.scope = "row";
        idFila.textContent = (i+1) + "";

        const event = document.createElement("td");
        event.textContent = listaEvents[i].getName;

        const mcc = document.createElement("td");
        mcc.textContent = listaEvents[i].getMcc;

        fila.appendChild(idFila);
        fila.appendChild(event);
        fila.appendChild(mcc);

        const tabla2 = document.querySelector(".tabla2");
        tabla2.appendChild(fila);
    }
}
class Event
{
    constructor(name)
    {
        this.name = name;
        this.tp = 0;
        this.tn = 0;
        this.fp = 0;
        this.fn = 0;
        this.mcc = 0;
    }
  
    get getName() 
    {
        return this.name;
    }

    get getTp() 
    {
        return this.tp;
    }

    get getTn() 
    {
        return numFilas - this.fn - this.tp - this.getFp;
    }
   
    get getFp() 
    {
        return numSquirrel - this.tp;
    }
   
    get getFn() 
    {
        return this.fn;
    }

    get getMcc() 
    {
        this.mcc = (((this.getTp * this.getTn) - (this.getFp * this.getFn)) / (Math.sqrt((this.getTp + this.getFp) * (this.getTp + this.getFn) * (this.getTn + this.getFp) * (this.getTn + this.getFn))));
        return this.mcc;
    }
 
    setTp() 
    {
        this.tp = this.tp + 1;
    }

    setFn() 
    {
        this.fn = this.fn + 1;
    }
}