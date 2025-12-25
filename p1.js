let navElement = document.getElementById("list-items");
let addItem = document.getElementById("add-item");
let a1 = document.getElementById("list1-text");
let count=1;
let s="";

renderList();

function renderList() {
    if(localStorage.length > 0) {
        let i=0,j=0,minPos=0,temp=0;
        let allkeys = [];
        for(i=0; i<localStorage.length; i++)
        {
            /*let listKey = localStorage.key(i);
            add(listKey);
            console.log(localStorage.key(i));
            document.getElementById("text-list"+listKey).value = localStorage.getItem(listKey);*/

            allkeys.push(+localStorage.key(i));
            console.log(localStorage.key(i));
        }
        //allkeys.sort();
        
        for(i=0; i<allkeys.length-1; i++)
        {
            minPos = i;
            for(j=i+1; j<allkeys.length; j++)
            {
                if(allkeys[j] < allkeys[minPos])
                {
                    minPos = j;
                }
            }
            temp = allkeys[i];
            allkeys[i] = allkeys[minPos];
            allkeys[minPos] = temp; 
        }
        
        for(i=0; i<allkeys.length; i++)
        {
            console.log(allkeys[i]);
            let listKey = allkeys[i];
            add(listKey);
            
            if(localStorage.getItem(listKey).substring(0,6) === "[#0#0]") {
                document.getElementById("checkbox-list"+listKey).checked = true;
                document.getElementById(listKey).style.opacity = 0.5;
                document.getElementById("text-list"+listKey).value = localStorage.getItem(listKey).substring(6);
                
            }
            else {
                document.getElementById("text-list"+listKey).value = localStorage.getItem(listKey);
            }
        }
    }
    else {
        add(1);
    }
}

navElement.addEventListener('input', function(event) {
    let listKey = event.target.parentElement.id;
    if(event.target.id.substring(0,4) === "text") {
        
        localStorage.setItem(listKey, document.getElementById(event.target.id).value);
        document.getElementById("checkbox-list"+event.target.id.substring(9)).checked = false;
        document.getElementById(event.target.id.substring(9)).style.opacity = 1;
        document.getElementById(event.target.id).rows = (document.getElementById(event.target.id).value.length != 0)?Math.ceil(document.getElementById(event.target.id).value.length / 40.0):1;
    }
    else if(event.target.id.substring(0,8) === "checkbox") {
        if(document.getElementById(event.target.id).checked) {
            document.getElementById(event.target.id.substring(13)).style.opacity = 0.5;
            //localStorage.setItem(listKey, "[#0#0]" + document.getElementById("text-list"+event.target.id.substring(13)).value);
            localStorage.setItem(listKey, "[#0#0]" + localStorage.getItem(listKey));
        }
        else {
            document.getElementById(event.target.id.substring(13)).style.opacity = 1;
            //localStorage.setItem(listKey, document.getElementById("text-list"+event.target.id.substring(13)).value.substring(6));
            localStorage.setItem(listKey, localStorage.getItem(listKey).substring(6));
        }
    }
    

});





document.body.addEventListener('click', function(event) {
    if(event.target.tagName === 'BUTTON') {
        if(event.target.id === "add-item") {
            add(++count);
        }
        else if(event.target.id === "delete-all") {
            deleteAll();
        }
        else {
            deleteItem(event.target.id.substring(6));
        }
    }
});

function add(c) {

    let liElm = document.createElement("li");
    liElm.setAttribute("id",c);

    let chElm = document.createElement("input");
    chElm.setAttribute("type", "checkbox");
    chElm.setAttribute("id", "checkbox-list"+c);

    let txtEl = document.createElement("textarea");
    txtEl.setAttribute("rows", "1");
    txtEl.setAttribute("cols", "40");
    //txtEl.setAttribute("maxlength", "40");
    //txtEl.setAttribute("wrap", "hard");
    txtEl.setAttribute("placeholder", "Type here..");
    txtEl.setAttribute("id", "text-list"+c);

    let delBtn = document.createElement("button");
    delBtn.setAttribute("id", "delete"+c);
    delBtn.innerText = "Delete";

    liElm.append(chElm, "\n", txtEl, "\n", delBtn);
    document.getElementById("list-items").appendChild(liElm);

    if(localStorage.getItem(c) == null)
        localStorage.setItem(c, "");

    count = c;
}

function deleteAll() {
    //s = "<li id=\"1\"><input type=\"checkbox\" id=\"checkbox-list1\"> <input type=\"text\" placeholder=\"Type here..\" id=\"text-list1\"></input> <button id=\"delete1\">Delete</button></li>";
    s= `<li id="1">
            <input type="checkbox" id="checkbox-list1">
            <textarea rows="1" cols="40" placeholder="Type here.." id="text-list1"></textarea>
            <button id="delete1">Delete</button>
        </li>`;
    navElement.innerHTML = s;

    localStorage.clear();
    localStorage.setItem(1, "");

    count = 1;
}

function deleteItem(liId) {
    document.getElementById(liId).remove();
    localStorage.removeItem(liId);

    if(document.getElementById("list-items").textContent.trim() === "") {
        deleteAll();
    }
}

/*addItem.addEventListener('click', function(event) {
    c++;

    let liElm = document.createElement("li");
    liElm.setAttribute("id",c);

    let chElm = document.createElement("input");
    chElm.setAttribute("type", "checkbox");
    chElm.setAttribute("id", "list"+c+"-checkbox");

    let txtEl = document.createElement("input");
    txtEl.setAttribute("type", "text");
    txtEl.setAttribute("placeholder", "Type here..");
    txtEl.setAttribute("id", "list"+c+"-text");

    let delBtn = document.createElement("button");
    delBtn.setAttribute("id", "delete"+c);
    delBtn.setAttribute("onclick", "deleteItem(this.id)");
    delBtn.innerText = "Delete";
    
    liElm.appendChild(chElm); 
    liElm.appendChild(txtEl);
    liElm.appendChild(delBtn); 

    liElm.append(chElm, txtEl,  delBtn);
    document.getElementById("list-items").appendChild(liElm);


});

deleteAll.addEventListener('click', function(event) {
    c=1;
    s = "<li id=\"1\"><input type=\"checkbox\" id=\"list1\"> <input type=\"text\" placeholder=\"Type here..\" oninput=\"saveInput(this.id)\" id=\"list1-text\"></input> <button id=\"delete1\" onclick=\"deleteItem(this.id)\">Delete</button></li>";
    navElement.innerHTML = s;
});*/

/*function deleteItem(deleteItemId) {
    document.getElementById(deleteItemId.charAt(deleteItemId.length-1)).remove();

    if(document.getElementById("list-items").textContent.trim() === "") {
        c=1;
        s = "<li id=\"1\"><input type=\"checkbox\" id=\"list1\"> <input type=\"text\" placeholder=\"Type here..\" oninput=\"saveInput(this.id)\" id=\"list1-text\"></input> <button id=\"delete1\" onclick=\"deleteItem(this.id)\">Delete</button></li>";
        navElement.innerHTML = s;
    }
}*/