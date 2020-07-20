const firstFunction = ()=>{
    if(!!Object.keys(localStorage).length){
        const ulTodo = document.getElementById('s3_todo-list--ul');
        //convert localStorage into an arrray
        const localStorageArray = Object.values(localStorage);
        const parsedLocalArray = localStorageArray.map(value=> JSON.parse(value));
        //sort array by time created so items maintain their position
        parsedLocalArray.sort((a,b)=>{
            return (b.time-a.time)
        })
        console.log(parsedLocalArray);
        parsedLocalArray.forEach(item=>{
            if(!!item.title){
            const todoLi = document.createElement('li');
            const todoMainDiv = document.createElement('div');
            const todoMainDivTitle = document.createElement('h3');
            todoMainDivTitle.innerHTML = item.title;
            todoMainDivTitle.addEventListener('click', ()=>{
                todoMainDivTitle.classList.toggle('task-done');
            })
            
            
            const todoMainDivDetails = document.createElement('p');
            todoMainDivDetails.innerHTML = item.details;
            
            const todoEditButton = document.createElement('button');
            todoEditButton.innerHTML= 'Edit';
            todoEditButton.setAttribute('class', 'button');
            
            //create deletebutton and add it's  event listener
            const todoDeleteButon = document.createElement('button');
            todoDeleteButon.innerHTML = 'Delete';
            todoDeleteButon.setAttribute('class', 'alert button shift-right');
            todoDeleteButon.addEventListener('click', ()=>{
                localStorage.removeItem(item.title);
                ulTodo.innerHTML = null;
                firstFunction()
            })
            
            
            
            
            //edit div - starts out hidden:
            const todoEditDiv = document.createElement('div');
            const todoEditForm = document.createElement('form');
            const todoEditDivGrid = document.createElement('div');
            todoEditDivGrid.setAttribute('class', 'grid-container');
            
            const todoEditTitle = document.createElement('input');
            todoEditTitle.setAttribute('placeholder', `Edit title - ${item.title}`);
            todoEditTitle.setAttribute('value', item.title );
            
            const todoEditDetails = document.createElement('input');
            todoEditDetails.setAttribute('placeholder', 'Edit details');
            todoEditDetails.setAttribute('value', item.details );
            
            const todoUpdateButton = document.createElement('input');
            todoUpdateButton.setAttribute('type', 'submit');
            todoUpdateButton.setAttribute('value', 'update');
            todoUpdateButton.setAttribute('class', 'success button');
            
            //create labels for edit input
            const todoEditTitleLabel = document.createElement('label');
            todoEditTitleLabel.appendChild(todoEditTitle);
            
            const todoEditDetailsLabel = document.createElement('label');
            todoEditDetailsLabel.appendChild(todoEditDetails);
            
            //add eventlistener for update button
            todoUpdateButton.addEventListener('click', ()=>{
                const oldDetailsJson = localStorage.getItem(item.title);
                const oldDetails = JSON.parse(oldDetailsJson);
                const newDetails = {
                    title: todoEditTitle.value,
                    time: item.time,
                    details: todoEditDetails.value
                }
                const newDetailsJson = JSON.stringify(newDetails);
                localStorage.removeItem(item.title);
                localStorage.setItem(newDetails.title, newDetailsJson);
                ulTodo.innerHTML = null;
                firstFunction()
                
            })
            
            //append elements of edit form to form and form to edit div
            todoEditDivGrid.appendChild(todoEditTitleLabel);
            todoEditDivGrid.appendChild(todoEditDetailsLabel);
            todoEditDivGrid.appendChild(todoUpdateButton);
            todoEditForm.appendChild(todoEditDivGrid);
            
            
            todoEditDiv.appendChild(todoEditForm);
            todoEditDiv.classList.add('hide-item');
            
            todoEditButton.addEventListener('click',()=>{
                todoEditDiv.classList.toggle('hide-item');
            })
            
            todoMainDiv.appendChild(todoMainDivTitle);
            todoMainDiv.appendChild(todoMainDivDetails);
            todoMainDiv.appendChild(todoEditButton);
            todoMainDiv.appendChild(todoDeleteButon);
            
            
            
            
        
            todoLi.appendChild(todoMainDiv);
            todoLi.appendChild(todoEditDiv);
            ulTodo.appendChild(todoLi);
            }
        
        })
        
        
    }
    
    
}






firstFunction();




//Warning paragraph for entry of a title that already exists.
const titleLabel = document.getElementById('title-label');
const warningPar = document.createElement('p');
warningPar.setAttribute('class', 'hide-item already-p');
titleLabel.appendChild(warningPar);





document.querySelector("#save-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const titleInput = document.getElementById('save-form--title');
    const title = titleInput.value;
    const details = document.getElementById('save-form--details').value;
    
    if(Object.keys(localStorage).includes(title)){
        warningPar.innerHTML = `Title '${title}' already exists`;
        warningPar.classList.remove('hide-item');
        titleInput.classList.add('already-exists');
        
    }else{
        const time = new Date;
        const timeForSort =time.getTime();
        
        const data = JSON.stringify({
            title,
            details,
            time: timeForSort
        })
        
        warningPar.classList.add('hide-item');
        
        
        window.localStorage.setItem(title, data);
        //alert(`${title} added to todo list.`);
        const ulTodo = document.getElementById('s3_todo-list--ul');
        ulTodo.innerHTML = null;
        firstFunction();
        document.getElementById('save-form--title').value="";
        document.getElementById('save-form--details').value="";
        titleInput.classList.remove('already-exists');
    }
    
    
});