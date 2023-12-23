let count=0;
function createCardElement(data) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    const cardHTML = `
    <div class="card-container" id="card-container">
    <div class="card-left">
        <div class="heading" id="heading">Epic Designs</div>
        <div class="stars" id = "star-image">
            <img src="assets/Group 1.svg" alt="" class="star-image">
        </div>
        <div class="card-para">
           <p id="card-para">Passionate team of 4 designers working out of Bangalore with an experience of 4 years</p>
        </div>
        <div class="card-stats">
            <div class="stats" id="stats">
                <div class="row-1" id="stats-1-row-1"></div>
                <div class="row-2">Projects</div>
            </div>
            <div class="stats" id="stats-2">
                <div class="row-1" id="stats-2-row-1"></div>
                <div class="row-2">Years</div>
            </div>
            <div class="stats" id="stats-3">
                <div class="row-1" id="stats-3-row-1"></div>
                <div class="row-2">Price</div>
            </div>
        </div>
        <div class="numbers-section">
            <div class="number-1">
                +91 - 984532853
            </div>
            <div class="number-2">
                +91 - 984532854
            </div>
        </div>
    </div>
    <div class="card-middle-line">
    </div>
    <div class="card-right">
        <div class="card-details">
            <img src="assets/arrow-right-short 1.svg" alt="" id="image" style="width: 30px; height: 30px;">
            <h6>Details</h6>
        </div>
        <div class="card-hide">
            <img src="assets/eye-slash 1.svg" alt="" id="image" style="width: 30px; height: 30px;">
            <h6>Hide</h6>
        </div>
        <div class="card-shortlist">
        <button id="shortlistbtn" style="border: none;"><img src="assets/bookmark-heart.svg"  alt="" id="shortlistimage" style="width: 30px; height: 30px;"></button>  
            <h6>Shortlist</h6>
        </div>
        <div class="card-report">
            <img src="assets/exclamation-circle 1.svg" alt="" id="image"style="width: 30px; height: 30px;">
            <h6>Report</h6>
        </div>
    </div>
</div>
    `;
    const parser = new DOMParser();
  const cardFragment = parser.parseFromString(cardHTML, 'text/html');
  const cardContainerElement = cardFragment.querySelector('.card-container');
  if (cardContainerElement) {
    const stats1Row1 = cardContainerElement.querySelector('#stats-1-row-1');
    const stats2Row1 = cardContainerElement.querySelector('#stats-2-row-1');
    const stats3Row1 = cardContainerElement.querySelector('#stats-3-row-1');
    const heading = cardContainerElement.querySelector('#heading');
    const image = cardContainerElement.querySelector(".star-image");
    const shortlistbtn = cardContainerElement.querySelector("#shortlistbtn");
    const shortlistimage = cardContainerElement.querySelector("#shortlistimage");
    
    if (stats1Row1) {
      stats1Row1.textContent = data.projects;
    }
    if (stats2Row1) {
      stats2Row1.textContent = data.years;
    }
    if (stats3Row1) {
      stats3Row1.textContent = data.price;
    }
    if(heading){
        heading.textContent = data.name;
    }
    
    if(image){
       image.src = data.path;
    }
    if(shortlistimage){
      if(data.isshorlist==="true"){
        shortlistimage.src = "assets/Vector.svg";
      }else if(data.isshorlist==="false"){
        shortlistimage.src = "assets/bookmark-heart.svg";
      }
    }
    if (shortlistbtn) {
      shortlistbtn.addEventListener('click', () => {
        const shortlisted = document.querySelector(".openup");
        const existingShortlistedElement = shortlisted.querySelector(`#card-container-${data.id}`);
        
        if (count==0) {
          shortlistimage.src = "assets/Vector.svg";
          count=1;
          
          if (!existingShortlistedElement) {
            const shortlisteelement = createCardElement(data);
            shortlisteelement.id = `card-container-${data.id}`;
            shortlisted.appendChild(shortlisteelement);
          }
        } else if (count==1) {
          shortlistimage.src = "assets/bookmark-heart.svg";
          count=0;
          
          if (existingShortlistedElement) {
            shortlisted.removeChild(existingShortlistedElement);
          }
        }
      });
    }
  }
  cardContainer.appendChild(cardContainerElement);
    return cardContainer;
  }
  fetch('http://127.0.0.1:5000/data')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const cardElement = createCardElement(item);
      const shortlisteelement = createCardElement(item);
      const parentContainer = document.getElementById('body-lists');
      const shortlisted = document.querySelector(".openup");
      parentContainer.appendChild(cardElement);
      if(item.isshorlist==="true"){
        shortlisted.appendChild(shortlisteelement);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching or parsing data:', error);
  });
  function updateShortlistUI(data,shortlistimage) {
    if (shortlistimage) {
      if (data.isshorlist === "true") {
        shortlistimage.src = "assets/Vector.svg";
      } else {
        shortlistimage.src = "assets/bookmark-heart.svg";
      }
    }
  }
