
let items = []
    let isEdit = false
    let itemIndex
    let indexDB
    const url = "http://localhost:5000/articles"
    
async function getTodos() {
    
    try{
        const res = await fetch(url)
        items = await res.json()
        if (items.length) {
        let div = '<div>'
        items.forEach((item, i) => {
            div += `<div id="item-${i}-${item.title}" class="item"> 
                <span class="new">* ${item.title}</span> <span></br> ${item.content}</span>
                <span class="delete" onclick="delFunction(event)">&times;</span>
                <span class="delete" onclick="editFunction(event)">edit</span>
                </div>`
                // console.log(item._id)
        })
        div += '</div>'
        document.getElementById('items').innerHTML = div
    } else {
        document.getElementById('items').innerHTML = ''
    }
    }catch(err){
        console.log(err)
    }
   
}

/////////// edit individually
function editFunction(e) {
    isEdit  = true
    const parentId = e.target.parentElement.id
    itemIndex = parentId.slice(5,6)
    indexDB = parentId.slice(7)
    document.getElementById('item').value = items[itemIndex].title
    document.getElementById('itemDate').value = items[itemIndex].content

}

function clearField() {
    document.querySelector('#myform').reset()
}

///////delete individually
async function delFunction(e) {
    const parentId = e.target.parentElement.id
    let indexDB = parentId.slice(7)

    const res = await fetch(`${url}/${indexDB}`, {
        method: "DELETE"
    } )
    const data = await res.json()
    if(data.success){
        getTodos()
    }
} 

getTodos()

//deleting full item
async function delAll(){
    const res = await fetch(url, {
        method: "DELETE"
    })
    res.json()
    getTodos()
    clearField()
}

    //adding items to (editMood or createMood)
 async function createTodo(){

    const title = document.getElementById('item').value
    const content = document.getElementById('itemDate').value

     data = { title, content }

    try{
        
        if (isEdit) {
            const res = await fetch(`${url}/${indexDB}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
            } )
            dataGet = await res.json()
            if(dataGet.success){
                getTodos
            }

        } else {
            const res = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            res.json()
        }
        getTodos()
        clearField()
        isEdit = false
        

    }catch(err){
        console.log(err)
    }
}
