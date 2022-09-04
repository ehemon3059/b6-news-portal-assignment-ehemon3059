

//.........Load category start ............
const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`

    fetch(url)
    .then(res => res.json())
    .then(data =>  displayCategory(data.data.news_category))

    .catch(error => console.log(error));
   
}




const displayCategory = (categories) => {

    // loadSpineer(true);


    const categoryMainDiv = document.getElementById('category-main-div');

    categories.forEach(category => {
      //  console.log(category)
        const creatDiv = document.createElement('div');
        creatDiv.classList.add('items');
        creatDiv.innerHTML = `
        
            <p onclick="loadBlogDetails('${category.category_id }','${category.category_name}')" >${category.category_name}</p>
       

        `;

    categoryMainDiv.appendChild(creatDiv)

       // console.log(creatDiv);

    
   });
}


//    const loadSpineer = (isLoading) => {
//         const load = document.getElementById('loading-spiner');
//         if(isLoading){
//             load.classList.remove('d-none')
//         }else{
//             load.classList.add('d-none')
//         }
//     }



const loadBlogDetails = async (id,CategoryName) => {

    const itemCountShow = document.getElementById('itemCount');
    itemCountShow.classList.remove('d-none');

   
    const questinBlg = document.getElementById('questionBlog');
    questinBlg.classList.add('d-none');

     const newsBlog = document.getElementById('category-section-maindiv');
    newsBlog.classList.remove('d-none');


    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
   

    console.log(url);



     DisplayCategoryDetails(data.data,CategoryName)

        
 
}

//.........Load category End ............



//.......default card items  show start......
const defaultCard = document.getElementById('category-section-maindiv');
const DefaultLoad = () => {
    const url = ` https://openapi.programming-hero.com/api/news/category/03`

    fetch(url)
    .then(res => res.json())
    .then(data =>  defaultDisplayCategory(data.data))

    .catch(error => console.log(error));
   
}

const defaultDisplayCategory = (datas) =>{

    const defaultCard = document.getElementById('category-section-maindiv');
    defaultCard.innerHTML = '';

    datas.forEach(data => {
        
        const creatDefaultCard = document.createElement('div');
        creatDefaultCard.classList.add('defaultCardClass');
        creatDefaultCard.innerHTML = `


        <div class="card mb-5" >
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${data.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.details.length > 600 ? data.details.slice(0,599)+"..." : data.details}</p> 
                    <div id="card-under-details" class="mt-5">

                        <p class="card-text"><span><img src="${data.author.img}" style="width:50px ;  border-radius: 50%;"> </span>&nbsp;  ${data.author.name ? data.author.name : '<span style="color:red;"> &nbsp; &nbsp;Author Name Not Found</span>'} </p>
                            
                       
                        <p> <i class="fa fa-eye" aria-hidden="true">  </i>  ${data.total_view ? data.total_view : '<span style="color:red;">No View Found</span>'}  </p>

                        <button onclick="viewCardDetails('${data._id}')"  class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">View Details</button>
                    </div>
                    

                </div>
                </div>
            </div>
        </div>

        
        `;
        defaultCard.appendChild(creatDefaultCard);
        
    })
    
}
DefaultLoad();

//.......default card items  show End......

//..........Onclick  details card show start...........
const DisplayCategoryDetails = (details,CategoryName) => {
   // console.log(details,CategoryName)
   
    const itemName = document.getElementById('item-Name');
   const itemNo = document.getElementById('item-count');
   const itemCount = details.length;
   itemNo.innerText =itemCount;
    itemName.innerHTML = CategoryName ;

    const itemDEtailsMain = document.getElementById('category-section-maindiv');
    itemDEtailsMain.innerHTML = '';



   for( const item of details){

      //  const totalNews = details.length;

      
        const cardItem = document.createElement('div');
        cardItem.classList.add('cardItems')
        cardItem.innerHTML =`
        
      
        <div class="card mb-5" >
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${item.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.details.length > 600 ? item.details.slice(0,599)+"..." : item.details}</p> 
                    <div id="card-under-details" class="mt-5">

                        <p class="card-text"><span><img src="${item.author.img}" style="width:50px ;  border-radius: 50%;"> </span>&nbsp; &nbsp; ${item.author.name ? item.author.name : '<span style="color:red;"> &nbsp; &nbsp;Author Name Not Found</span>'} </p>
                            
                       
                        <p> <i class="fa fa-eye" aria-hidden="true">  </i>  ${item.total_view ? item.total_view : '<span style="color:red;">No View Found</span>'}  </p>

                        <button onclick="viewCardDetails('${item._id}')"  class="btn btn-primary btn-sm " data-bs-toggle="modal" data-bs-target="#exampleModal">View Details</button>
                    </div>
                    

                </div>
                </div>
            </div>
        </div>
        
        `;
        itemDEtailsMain.appendChild(cardItem)
      //  console.log(item);
       

   }

    //    loadSpineer(false);

  
}





const viewCardDetails = async id => {




 
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    DisplayCardDetails(data.data)

      

}

const DisplayCardDetails = (cards) => {


    

    const cardDetail = document.getElementById('cardTitle');
    //const cardDetailName = `https://openapi.programming-hero.com/api/news/category/${cards[0].category_id}`;
  //  console.log(cardDetailName);

    cardDetail.innerHTML = `<h4>Blog Details</h4>`;
    const modalDetailsBody = document.getElementById('cardBody');
    modalDetailsBody.innerHTML = `
    
    <img src="${cards[0].image_url}" style="width:200px;" class="text-center" >
    <p><b>Title : </b>${cards[0].title}</p>
    <P><b>Details :</b> ${cards[0].details ? cards[0].details : 'No Details Found'}</p>
    <img src="${cards[0].author.img}" style="width:50px ;  " >
    <P><b>Author Name : </b> ${cards[0].author.name ? cards[0].author.name : 'No Author Found' }</p>
    <p><b>Total View : </b>  &nbsp;&nbsp;&nbsp;<i class="fa fa-eye" aria-hidden="true">  </i>  ${cards[0].total_view ? cards[0].total_view : '<span style="color:red;">No View Found</span>'} </p>
    
    `;
}


  //..........Onclick  details card show End...........


 loadCategory();
