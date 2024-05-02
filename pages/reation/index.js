var sharedReaction = localStorage.getItem('sharedReaction');
        var sharedReactionsContainer = document.getElementById('sharedReactions');
        if (sharedReaction) {
            sharedReactionsContainer.innerHTML = `<p>${sharedReaction}</p>`;
        } else {
            sharedReactionsContainer.innerHTML = "<p>No shared reactions yet.</p>";
        }
        let stars = document.getElementsByClassName("star");
        let output = document.getElementById("output");
        Array.from(stars).forEach(star => {
            star.addEventListener("click", function() {
                output.innerHTML = `You rated: ${star.textContent}`;
            });
        });
      
        function logout() {   
            localStorage.removeItem('logout');
            localStorage.removeItem('loggedInEmail');
            window.location.href = '../login/index.html'; 
        }
        function back(){
            localStorage.removeItem('back');
            window.location.href = '../home/index.html';
        }
        
       
        
 
function gfg(n) {
    remove();
    for (let i = 0; i < n; i++) {
        if (n == 1) cls = "one";
        else if (n == 2) cls = "two";
        else if (n == 3) cls = "three";
        else if (n == 4) cls = "four";
        else if (n == 5) cls = "five";
        stars[i].className = "star " + cls;
    }
    output.innerText = "Rating is: " + n + "/5";
}
 

function remove() {
    let i = 0;
    while (i < 5) {
        stars[i].className = "star";
        i++;
    }
}