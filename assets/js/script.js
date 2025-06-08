function startquiz(){
    const question_text = document.getElementById('questiontext');
    const user_selection = document.getElementById('subject-select').value;
    const btn = document.getElementById('start');

    btn.addEventListener('click', function(){
       window.alert(user_selection ,'you selected');
    })
}