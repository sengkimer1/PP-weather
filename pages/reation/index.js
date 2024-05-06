// async function onLoad() {
//    if (await checkIsLoggedIn()) redirect();


//     await fetchAPIReaction();

// }

// function onsubmit() {
//     saveRaction();
//     fetchReactions();
// }




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

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('reactionForm').addEventListener('submit', function (event) {
      event.preventDefault();
      submitReaction();
  });
});

function submitReaction() {
    const email = localStorage.getItem("loggedInEmail");
    const comment = document.getElementById('commentInput').value;
    const rating = document.getElementById('ratingInput').value;

  if (rating < 1 || rating > 5 || comment.trim() === "") {
      alert("Please enter a valid rating (1-5) and a comment.");
      return;
  }

  fetch("https://weather-backend-kappa.vercel.app/reactions", {
      method: "POST",
      body: JSON.stringify({
          comment: comment,
          email: email,
          rating: rating
      }),
      headers: {
          'api-key': '321dd35cfdb912208ad17ff541fa5335170e957ef19362431897d25599b703d0',
          "Content-type": "application/json; charset=UTF-8"
      }
  })
  .then(response => response.json())
  .then(data => {
      console.log(data); 
      displayCommentRatingAndEmail(email,comment, rating );
  })
  .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
  });
}
function fetchReactions() {
    fetch("https://weather-backend-kappa.vercel.app/reactions", {
        method: "GET",
        headers: {
            'api-key': '321dd35cfdb912208ad17ff541fa5335170e957ef19362431897d25599b703d0'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayReactions(data.data);
            processReactions(data.data);
        })
        .catch(error => {
            console.error('There was a problem with fetching reactions:', error);
            alert('Failed to fetch reactions. Please try again later.');
        });
}

// Call the fetchReactions function to initiate the fetch operation
fetchReactions();

function displayReactions(reactions) {
    const reactionsContainer = document.getElementById('reactionsContainer');

    // Display only the first three reactions
    for (let i = 0; i < 3 && i < reactions.length; i++) {
        const reaction = reactions[i];

        const reactionBox = document.createElement('div');
        reactionBox.classList.add('reaction-box'); // Add a class for styling

        const email = reaction.email;
        const comment = reaction.comment;
        const rating = reaction.rating;
        reactionBox.innerHTML = `
            <p>Email: ${email}</p>
            <p>Comment: ${comment}</p>
            <p>Rating: ${rating}/5</p>
            
        `;

        // Create a container for each reaction box
        const reactionContainer = document.createElement('div');
        reactionContainer.classList.add('reaction-container');
        reactionContainer.appendChild(reactionBox);

        reactionsContainer.appendChild(reactionContainer); // Append the reaction container to the main reactions container
    }
}
document.getElementById('reactionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get reaction details from form
    const email = document.getElementById('email').value;
  
    const comment = document.getElementById('comment').value;
    const rating = document.getElementById('rating').value;
    // Create reaction object
    const newReaction = { comment: comment ,email: email, rating: rating};

    // Call displayCommentRatingAndEmail function with new reaction
    displayCommentRatingAndEmail(email,comment, rating );
});






function displayCommentRatingAndEmail(email, comment, rating) {
    const reactionsContainer = document.getElementById('reactionsContainer');

    // Create a reaction box for the new reaction
    const reactionBox = document.createElement('div');
    reactionBox.classList.add('reaction-box'); // Add a class for styling

    // Populate the reaction box with reaction details
    const emailParagraph = document.createElement('p');
    emailParagraph.textContent = `Email: ${email}`;
    reactionBox.appendChild(emailParagraph);

    const commentParagraph = document.createElement('p');
    commentParagraph.textContent = `Comment: ${comment}`;
    reactionBox.appendChild(commentParagraph);

    const ratingParagraph = document.createElement('p');
    ratingParagraph.textContent = `Rating: ${rating}/5`;
    reactionBox.appendChild(ratingParagraph);

    // Append the reaction box to the reactions container
    reactionsContainer.appendChild(reactionBox);
}



