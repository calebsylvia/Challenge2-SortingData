import data from "../data/data.json" assert { type: "json" };
import { funTime } from "./funBtn.js";

let shown = document.getElementById("shown");
let sort = document.getElementById("sort");
let tbody = document.getElementById("tbody");
let reverseBtn = document.getElementById("reverseBtn");
let preBtn = document.getElementById("preBtn");
let nexBtn = document.getElementById("nexBtn");
let funBtn = document.getElementById("funBtn");
let funText = document.getElementById("funText");

let maxPeople;
let start = 0;
let reverse = false;

reverseBtn.addEventListener('click', () => {
    if(!reverse){
        reverse = true;
        reverseBtn.innerText = "Ascending"
    }else{
        reverse = false;
        reverseBtn.innerText = "Descending"
    }
    return sort.value === 'selected' ? displayPeople(data.People) : checkSort(sort.value);
})

preBtn.addEventListener('click', () => {
    start -= maxPeople;
    if(start < 0){
        start = data.People.length - maxPeople
    }
    checkSort(sort.value);
})

nexBtn.addEventListener('click', () => {
    start += maxPeople;
    if(start >= data.People.length){
        start = 0
    }
    checkSort(sort.value);
})

funBtn.addEventListener('click', () => {
    funText.classList.remove("visually-hidden");
    funTime();
})



const sortFirst =  () => {
    const firstSort = data.People.sort((one, two) => {
        return one.FirstName.localeCompare(two.FirstName)
    })
    if(reverse){
        return displayPeople(firstSort.reverse());
    }else{
        return displayPeople(firstSort)
    }
}

const sortLast =  (one, two) => {
    const lastSort = data.People.sort((one, two) => {
        return one.LastName.localeCompare(two.LastName)
    })
    if(reverse){
        return displayPeople(lastSort.reverse());
    }else{
        return displayPeople(lastSort)
    }
}

const sortId = (one, two) => {
    const idSort = data.People.sort((one, two) => {
        return one.Id - two.Id;
    })
    if(reverse){
        return displayPeople(idSort.reverse());
    }else{
        return displayPeople(idSort)
    }
}

const sortAge = (one, two) => {
    const ageSort = data.People.sort((one, two) => {
        return one.Age - two.Age;
    })
    if(reverse){
        return displayPeople(ageSort.reverse());
    }else{
        return displayPeople(ageSort)
    }
}

const sortHeight = (one, two) => {
   const heightSort = data.People.sort((one, two) => {
    return one.Height.substring(0, 2) - two.Height.substring(0, 2);
   })
   if(reverse){
    return displayPeople(heightSort.reverse());
}else{
    return displayPeople(heightSort)
}
}



const checkSort = (e) => {


    switch(e){
        case "Id":
            sortId();
            break;
        case "First": 
            sortFirst();
            break;
        case "Last":
            sortLast();
            break;
        case "Height":
            sortHeight();
            break;
        case "Age":
            sortAge();
            break;
        default:
            displayPeople(data.People);
    }
}




sort.addEventListener('change', (e) => {
    checkSort(e.target.value);
    console.log(e.target.value);
});


shown.addEventListener('change', (e) => {
    maxPeople = shown.value !== 'selected' ? parseInt(shown.value) : 100
    checkSort(shown.value);
});






const displayPeople = (arr) => {

    tbody.innerHTML = "";
    arr.slice(start, start + maxPeople).map((person) => {
    
        let tr = document.createElement("tr");
        let th = document.createElement("th");
        let fName = document.createElement("td");
        let lName = document.createElement("td");
        let height = document.createElement("td");
        let age = document.createElement("td");
        let email = document.createElement("td");

        th.textContent = person.Id;
        th.scope = "row";
        fName.textContent = person.FirstName;
        lName.textContent = person.LastName;
        height.textContent = person.Height;
        age.textContent = person.Age;
        email.textContent = person.Email;

        tr.appendChild(th);
        tr.appendChild(fName);
        tr.appendChild(lName);
        tr.appendChild(height);
        tr.appendChild(email);
        tr.appendChild(age);
        tbody.append(tr);
    })

}



